import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/admin-session"
import { readSubmissions } from "@/lib/submissions"
import { STATUS_LABELS, STATUS_STYLES } from "@/lib/submission-constants"
import { requestTypeLabels } from "@/lib/schemas/contact-form"
import { AdminShell } from "@/components/admin/admin-shell"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

  if (!token) redirect("/admin/login")
  const session = await verifySessionToken(token)
  if (!session) redirect("/admin/login")

  const submissions = readSubmissions()

  const stats = {
    total: submissions.length,
    new: submissions.filter((s) => s.status === "new").length,
    in_progress: submissions.filter((s) => s.status === "in_progress").length,
    done: submissions.filter((s) => s.status === "done").length,
  }

  const recent = submissions.slice(0, 5)

  return (
    <AdminShell username={session.username} title="Дашборд">
      <div className="space-y-6">
        {/* Статистика */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Всего заявок", value: stats.total },
            { label: "Новых", value: stats.new },
            { label: "В работе", value: stats.in_progress },
            { label: "Выполнено", value: stats.done },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl border bg-card p-5 space-y-1 shadow-sm"
            >
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="text-3xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        {/* Последние заявки */}
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="font-semibold">Последние заявки</h2>
            <Link
              href="/admin/submissions"
              className="text-xs text-primary hover:underline"
            >
              Все заявки →
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Заявок пока нет. Они появятся здесь после того, как пользователи
              заполнят форму обратной связи.
            </div>
          ) : (
            <div className="divide-y">
              {recent.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-4 px-5 py-3 text-sm"
                >
                  <span className="font-mono text-muted-foreground w-16 shrink-0">
                    #{s.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{s.organizationName}</p>
                    <p className="text-xs text-muted-foreground">
                      {requestTypeLabels[s.requestType]}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium shrink-0 ${STATUS_STYLES[s.status]}`}
                  >
                    {STATUS_LABELS[s.status]}
                  </span>
                  <span className="text-muted-foreground shrink-0 hidden sm:block w-24 text-right">
                    {new Date(s.createdAt).toLocaleDateString("ru-RU")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  )
}
