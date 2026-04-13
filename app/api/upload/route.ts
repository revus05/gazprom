import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/admin-session"
import fs from "node:fs"
import path from "node:path"

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "news")

export async function POST(request: NextRequest) {
  // Проверка авторизации
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const session = await verifySessionToken(token)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Создаём папку, если нет
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true })
  }

  const formData = await request.formData()
  const file = formData.get("file") as File | null
  if (!file) {
    return NextResponse.json({ error: "Файл не передан" }, { status: 400 })
  }

  // Только изображения
  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Допускаются только изображения" },
      { status: 400 },
    )
  }

  // Максимальный размер — 5 МБ
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Максимальный размер файла — 5 МБ" },
      { status: 400 },
    )
  }

  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const filepath = path.join(UPLOAD_DIR, filename)

  const buffer = Buffer.from(await file.arrayBuffer())
  fs.writeFileSync(filepath, buffer)

  return NextResponse.json({ url: `/uploads/news/${filename}` })
}
