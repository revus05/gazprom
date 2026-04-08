import Link from "next/link"
import { ArrowRight, Pipe, Wrench, ChartBar, Gauge } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/ui/button"

const featuredServices = [
  {
    icon: Pipe,
    title: "Транспортировка природного газа",
    description:
      "Обеспечиваем надёжную и бесперебойную транспортировку природного газа по разветвлённой сети магистральных и распределительных газопроводов.",
    tags: ["Магистральные ГП", "Отводы", "ГРС"],
  },
  {
    icon: Wrench,
    title: "Техническое обслуживание",
    description:
      "Полный комплекс работ по обслуживанию и ремонту газотранспортной инфраструктуры: от плановых осмотров до капитального ремонта.",
    tags: ["Плановое ТО", "Ремонт", "Диагностика"],
  },
  {
    icon: ChartBar,
    title: "Коммерческий учёт газа",
    description:
      "Установка, калибровка и обслуживание узлов коммерческого учёта газа. Обеспечение точности измерений в соответствии с требованиями законодательства.",
    tags: ["Метрология", "Учёт", "Сертификация"],
  },
  {
    icon: Gauge,
    title: "Регулирование давления",
    description:
      "Монтаж и эксплуатация газорегуляторных пунктов и установок для поддержания необходимого давления газа у потребителей.",
    tags: ["ГРП", "ГРУ", "Автоматика"],
  },
]

export function ServicesPreview() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Что мы предлагаем</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ключевые услуги
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/services">
              Все услуги
              <ArrowRight weight="bold" className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredServices.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="group bg-white rounded-2xl p-6 md:p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Icon weight="duotone" className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full bg-primary/8 text-primary text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
