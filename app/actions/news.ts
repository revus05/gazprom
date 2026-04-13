"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/admin-session"
import { createNewsItem, updateNewsItem, deleteNewsItem } from "@/lib/news"

async function checkAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!token) redirect("/admin/login")
  const session = await verifySessionToken(token)
  if (!session) redirect("/admin/login")
  return session
}

export async function createNewsAction(
  _prevState: { error?: string } | null,
  formData: FormData,
): Promise<{ error: string }> {
  await checkAuth()

  const title = String(formData.get("title") ?? "").trim()
  const content = String(formData.get("content") ?? "").trim()
  const coverImage = String(formData.get("coverImage") ?? "").trim() || null
  const published = formData.get("published") === "true"

  if (!title) return { error: "Введите заголовок" }
  if (!content) return { error: "Введите текст новости" }

  createNewsItem({ title, content, coverImage, published })
  redirect("/admin/news")
}

export async function updateNewsAction(
  id: number,
  _prevState: { error?: string } | null,
  formData: FormData,
): Promise<{ error: string }> {
  await checkAuth()

  const title = String(formData.get("title") ?? "").trim()
  const content = String(formData.get("content") ?? "").trim()
  const coverImage = String(formData.get("coverImage") ?? "").trim() || null
  const published = formData.get("published") === "true"

  if (!title) return { error: "Введите заголовок" }
  if (!content) return { error: "Введите текст новости" }

  updateNewsItem(id, { title, content, coverImage, published })
  redirect("/admin/news")
}

export async function deleteNewsAction(formData: FormData) {
  await checkAuth()
  const id = Number(formData.get("id"))
  if (id) deleteNewsItem(id)
  redirect("/admin/news")
}
