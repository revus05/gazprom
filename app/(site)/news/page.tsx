import Image from "next/image"
import Link from "next/link"
import { Calendar, Newspaper } from "lucide-react"
import { readNews } from "@/lib/news"
import { CtaBanner } from "@/components/home/cta-banner"
import { NewsFilters } from "@/components/news/news-filters"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Новости — Газпром трансгаз Беларусь",
  description:
    "Актуальные новости и события ООО «Газпром трансгаз Беларусь».",
}

type SortValue = "newest" | "oldest" | "az"

interface PageProps {
  searchParams: Promise<{ q?: string; sort?: SortValue }>
}

export default async function NewsPage({ searchParams }: PageProps) {
  const { q = "", sort = "newest" } = await searchParams

  const query = q.trim().toLowerCase()

  const allNews = (await readNews())
    .filter((n) => n.published)
    .filter((n) => {
      if (!query) return true
      return (
        n.title.toLowerCase().includes(query) ||
        n.content.toLowerCase().includes(query)
      )
    })
    .sort((a, b) => {
      if (sort === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      }
      if (sort === "az") {
        return a.title.localeCompare(b.title, "ru")
      }
      // newest (default)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  return (
    <>
      {/* Hero */}
      <section
        className="py-20 md:py-28 relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[oklch(0.12_0.04_255)]/88" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-yellow/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="relative container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-0.5 bg-yellow rounded-full" />
            <p className="text-yellow font-semibold text-sm uppercase tracking-wider">
              Пресс-служба
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Новости компании
          </h1>
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            Актуальные события, достижения и обновления от ООО «Газпром трансгаз
            Беларусь».
          </p>
        </div>
      </section>

      {/* Список новостей */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          {/* Фильтры */}
          <Suspense>
            <NewsFilters />
          </Suspense>

          {/* Результаты */}
          {allNews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
                <Newspaper className="w-8 h-8 text-muted-foreground" />
              </div>
              {query ? (
                <>
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Ничего не найдено
                  </h2>
                  <p className="text-muted-foreground max-w-sm">
                    По запросу{" "}
                    <span className="font-medium text-foreground">
                      «{q}»
                    </span>{" "}
                    новостей не найдено. Попробуйте другой поисковый запрос.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Новостей пока нет
                  </h2>
                  <p className="text-muted-foreground max-w-sm">
                    Следите за обновлениями — скоро здесь появятся актуальные
                    новости компании.
                  </p>
                </>
              )}
            </div>
          ) : (
            <>
              {query && (
                <p className="text-sm text-muted-foreground mb-5">
                  Найдено:{" "}
                  <span className="font-medium text-foreground">
                    {allNews.length}
                  </span>{" "}
                  {plural(allNews.length, ["новость", "новости", "новостей"])} по
                  запросу «{q}»
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allNews.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="group flex flex-col rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    {/* Обложка */}
                    <div className="aspect-video w-full bg-muted overflow-hidden">
                      {item.coverImage ? (
                        <Image
                          src={item.coverImage}
                          alt={item.title}
                          width={600}
                          height={338}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/5">
                          <Newspaper className="w-10 h-10 text-primary/30" />
                        </div>
                      )}
                    </div>

                    {/* Контент */}
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                        <Calendar className="size-3.5" />
                        {new Date(item.createdAt).toLocaleDateString("ru-RU", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <h2 className="font-semibold text-foreground text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                        {item.content}
                      </p>
                      <div className="mt-4 text-sm font-medium text-primary group-hover:underline">
                        Читать далее →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  )
}

function plural(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 14) return forms[2]
  if (mod10 === 1) return forms[0]
  if (mod10 >= 2 && mod10 <= 4) return forms[1]
  return forms[2]
}
