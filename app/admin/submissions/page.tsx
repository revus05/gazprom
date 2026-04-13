import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/admin-session"
import { readSubmissions } from "@/lib/submissions"
import { AdminShell } from "@/components/admin/admin-shell"
import { SubmissionsTable } from "./submissions-table"

export default async function SubmissionsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

  if (!token) redirect("/admin/login")
  const session = await verifySessionToken(token)
  if (!session) redirect("/admin/login")

  // Читаем заявки на сервере — SSR, данные приходят вместе с HTML
  const submissions = readSubmissions()

  return (
    <AdminShell username={session.username} title="Заявки">
      <SubmissionsTable submissions={submissions} />
    </AdminShell>
  )
}
