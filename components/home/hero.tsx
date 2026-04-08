import Link from "next/link"
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[oklch(0.15_0.04_255)]">
      {/* Background geometric pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.72_0.14_255)] animate-pulse" />
            Надёжный партнёр с 1994 года
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            Газовые услуги
            <br />
            <span className="text-[oklch(0.72_0.14_255)]">для вашего бизнеса</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
            ООО «Газпром трансгаз Беларусь» обеспечивает бесперебойную транспортировку,
            распределение и техническое обслуживание газовой инфраструктуры для корпоративных клиентов
            по всей территории Республики Беларусь.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button asChild size="lg" className="text-base">
              <Link href="/contacts">
                Оставить заявку
                <ArrowRight weight="bold" className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base border-white/30 text-white bg-white/5 hover:bg-white/15 hover:text-white"
            >
              <Link href="/services">Наши услуги</Link>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            {[
              "Лицензированная деятельность",
              "Круглосуточная диспетчерская служба",
              "Собственная аварийная служба",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-white/75 text-sm">
                <CheckCircle weight="fill" className="w-4 h-4 text-[oklch(0.72_0.14_255)] shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
