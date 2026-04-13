import { NextRequest, NextResponse } from "next/server"
import {
  verifySessionToken,
  SESSION_COOKIE_NAME,
} from "@/lib/admin-session"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLoginPage = pathname === "/admin/login"
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value

  // Нет токена
  if (!token) {
    if (isLoginPage) return NextResponse.next()
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  // Есть токен — верифицируем
  const session = await verifySessionToken(token)

  if (!session) {
    // Невалидный токен — чистим куку
    if (isLoginPage) {
      const res = NextResponse.next()
      res.cookies.delete(SESSION_COOKIE_NAME)
      return res
    }
    const res = NextResponse.redirect(new URL("/admin/login", request.url))
    res.cookies.delete(SESSION_COOKIE_NAME)
    return res
  }

  // Валидный токен + пытается зайти на /admin/login → перенаправляем в дашборд
  if (isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}
