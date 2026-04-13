import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/admin-session"
import { AdminShell } from "@/components/admin/admin-shell"
import { NewsForm } from "@/components/admin/news-form"
import { createNewsAction } from "@/app/actions/news"

export default async function NewNewsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!token) redirect("/admin/login")
  const session = await verifySessionToken(token)
  if (!session) redirect("/admin/login")

  return (
    <AdminShell username={session.username} title="Новая новость">
      <NewsForm action={createNewsAction} submitLabel="Создать новость" />
    </AdminShell>
  )
}
