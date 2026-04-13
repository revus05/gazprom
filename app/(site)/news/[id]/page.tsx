import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar } from "lucide-react"
import { getNewsById, readNews } from "@/lib/news"
import { CtaBanner } from "@/components/home/cta-banner"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return readNews()
    .filter((n) => n.published)
    .map((n) => ({ id: String(n.id) }))
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const news = getNewsById(Number(id))
  if (!news || !news.published) return {}
  return {
    title: `${news.title} — Газпром трансгаз Беларусь`,
    description: news.content.slice(0, 160),
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params
  const news = getNewsById(Number(id))

  if (!news || !news.published) notFound()

  // Разбиваем текст на абзацы по переносу строк
  const paragraphs = news.content
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <>
      {/* Обложка */}
      {news.coverImage && (
        <div className="w-full h-64 md:h-96 relative overflow-hidden">
          <Image
            src={news.coverImage}
            alt={news.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      {/* Контент */}
      <section
        className={`py-12 md:py-20 bg-white ${!news.coverImage ? "pt-24 md:pt-28" : ""}`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl">
          {/* Назад */}
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="size-4" />
            Все новости
          </Link>

          {/* Дата */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
            <Calendar className="size-4" />
            {new Date(news.createdAt).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>

          {/* Заголовок */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
            {news.title}
          </h1>

          {/* Разделитель */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-12 h-0.5 bg-yellow rounded-full" />
            <span className="text-sm text-yellow-dark font-semibold uppercase tracking-wider">
              Газпром трансгаз Беларусь
            </span>
          </div>

          {/* Текст */}
          <div className="prose prose-base max-w-none text-foreground/85 leading-relaxed space-y-4">
            {paragraphs.map((para, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: paragraph order is stable
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
