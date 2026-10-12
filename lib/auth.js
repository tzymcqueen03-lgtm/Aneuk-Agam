import crypto from "crypto";
import { cookies } from "next/headers";

export const COOKIE_NAME = "aa_admin";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 jam

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

export function hasAdminPassword() {
  return adminPassword().length > 0;
}

function safeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

/** Token turunan dari ADMIN_PASSWORD — tidak bisa dipalsukan tanpa tahu password. */
export function expectedToken() {
  const pwd = adminPassword();
  if (!pwd) return null;
  return crypto.createHmac("sha256", pwd).update("aneukagam::admin::v1").digest("hex");
}

export function checkPassword(input) {
  const pwd = adminPassword();
  if (!pwd) return false;
  return safeEqual(input, pwd);
}

export function isAuthed() {
  const exp = expectedToken();
  if (!exp) return false;
  const c = cookies().get(COOKIE_NAME);
  if (!c || !c.value) return false;
  return safeEqual(c.value, exp);
}

export function cookieOptions() {
  return {
    name: COOKIE_NAME,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  };
}

export function blobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN || "";
}
