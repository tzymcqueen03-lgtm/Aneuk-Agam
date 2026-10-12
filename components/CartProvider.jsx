"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fastService } from "@/config/site";
import { hitungTotal } from "@/lib/format";

const CartContext = createContext(null);
const STORAGE_KEY = "aneukagam.cart.v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ id, name, price }]
  const [fast, setFast] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [lastAdded, setLastAdded] = useState(null); // untuk animasi feedback

  // Muat dari localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.items)) setItems(parsed.items);
        if (typeof parsed.fast === "boolean") setFast(parsed.fast);
      }
    } catch {
      /* abaikan */
    }
    setHydrated(true);
  }, []);

  // Simpan ke localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, fast }));
    } catch {
      /* abaikan */
    }
  }, [items, fast, hydrated]);

  const isSelected = useCallback((id) => items.some((it) => it.id === id), [items]);

  const toggleItem = useCallback((service) => {
    setItems((prev) => {
      const exists = prev.some((it) => it.id === service.id);
      if (exists) {
        return prev.filter((it) => it.id !== service.id);
      }
      setLastAdded({ id: service.id, at: Date.now() });
      return [...prev, { id: service.id, name: service.name, price: service.price }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setFast(false);
  }, []);

  const { subtotal, fastFee, total } = useMemo(
    () => hitungTotal({ items, fast, fastPrice: fastService.price }),
    [items, fast]
  );

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      fast,
      setFast,
      toggleFast: () => setFast((v) => !v),
      isSelected,
      toggleItem,
      removeItem,
      clearCart,
      subtotal,
      fastFee,
      total,
      hydrated,
      lastAdded,
    }),
    [
      items,
      fast,
      isSelected,
      toggleItem,
      removeItem,
      clearCart,
      subtotal,
      fastFee,
      total,
      hydrated,
      lastAdded,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart harus dipakai di dalam <CartProvider>");
  return ctx;
}
