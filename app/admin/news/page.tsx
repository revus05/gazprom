import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Plus, Pencil } from "lucide-react"
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/admin-session"
import { readNews } from "@/lib/news"
import { AdminShell } from "@/components/admin/admin-shell"
import { Button } from "@/components/ui/button"
import { DeleteNewsButton } from "@/components/admin/delete-news-button"

export default async function AdminNewsPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!token) redirect("/admin/login")
  const session = await verifySessionToken(token)
  if (!session) redirect("/admin/login")

  const news = readNews()

  return (
    <AdminShell username={session.username} title="Новости">
      <div className="space-y-4">
        {/* Шапка */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {news.length === 0
              ? "Новостей пока нет"
              : `${news.length} ${plural(news.length, "новость", "новости", "новостей")}`}
          </p>
          <Button asChild size="sm">
            <Link href="/admin/news/new">
              <Plus className="size-4 mr-1.5" />
              Добавить новость
            </Link>
          </Button>
        </div>

        {/* Список */}
        {news.length === 0 ? (
          <div className="rounded-xl border bg-card shadow-sm py-16 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Здесь будут отображаться все новости компании
            </p>
            <Button asChild size="sm">
              <Link href="/admin/news/new">
                <Plus className="size-4 mr-1.5" />
                Создать первую новость
              </Link>
            </Button>
          </div>
        ) : (
          <div className="rounded-xl border bg-card shadow-sm divide-y">
            {news.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 px-5 py-4"
              >
                {/* Обложка */}
                <div className="shrink-0 w-16 h-11 rounded-lg overflow-hidden bg-muted border border-border">
                  {item.coverImage ? (
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      width={64}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/40 text-xs">
                      нет фото
                    </div>
                  )}
                </div>

                {/* Инфо */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(item.createdAt).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Статус */}
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    item.published
                      ? "bg-green-100 text-green-700"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {item.published ? "Опубликовано" : "Черновик"}
                </span>

                {/* Действия */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/admin/news/${item.id}/edit`}>
                      <Pencil className="size-3.5 mr-1" />
                      Редактировать
                    </Link>
                  </Button>
                  <DeleteNewsButton id={item.id} title={item.title} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  )
}

function plural(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few
  return many
}
