import { cookies } from "next/headers"
import { redirect, notFound } from "next/navigation"
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/admin-session"
import { getNewsById } from "@/lib/news"
import { AdminShell } from "@/components/admin/admin-shell"
import { NewsForm } from "@/components/admin/news-form"
import { updateNewsAction } from "@/app/actions/news"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditNewsPage({ params }: Props) {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!token) redirect("/admin/login")
  const session = await verifySessionToken(token)
  if (!session) redirect("/admin/login")

  const { id } = await params
  const news = getNewsById(Number(id))
  if (!news) notFound()

  const boundAction = updateNewsAction.bind(null, news.id)

  return (
    <AdminShell username={session.username} title="Редактировать новость">
      <NewsForm
        news={news}
        action={boundAction}
        submitLabel="Сохранить изменения"
      />
    </AdminShell>
  )
}
