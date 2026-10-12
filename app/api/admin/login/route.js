import { NextResponse } from "next/server";
import { checkPassword, expectedToken, hasAdminPassword, COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request) {
  if (!hasAdminPassword()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "ADMIN_PASSWORD belum diatur. Tambahkan environment variable ADMIN_PASSWORD di Vercel lalu redeploy.",
      },
      { status: 500 }
    );
  }

  let password = "";
  try {
    const body = await request.json();
    password = String(body?.password || "");
  } catch {
    return NextResponse.json({ ok: false, error: "Permintaan tidak valid." }, { status: 400 });
  }

  if (!password) {
    return NextResponse.json({ ok: false, error: "Password wajib diisi." }, { status: 400 });
  }

  if (!checkPassword(password)) {
    // Jeda kecil untuk memperlambat brute force
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ ok: false, error: "Password salah." }, { status: 401 });
  }

  const token = expectedToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return res;
}
