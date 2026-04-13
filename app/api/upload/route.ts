import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/admin-session"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  // Проверка авторизации
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const session = await verifySessionToken(token)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

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

  const buffer = Buffer.from(await file.arrayBuffer())

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "gazprom/news" }, (error, result) => {
        if (error || !result) return reject(error ?? new Error("Upload failed"))
        resolve(result)
      })
      .end(buffer)
  })

  return NextResponse.json({ url: result.secure_url })
}
