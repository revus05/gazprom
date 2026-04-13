import Link from "next/link"
import { ArrowRight, Pipette, Wrench, BarChart3, Gauge } from "lucide-react"
import { Button } from "@/ui/button"

const featuredServices = [
  {
    icon: Pipette,
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
    icon: BarChart3,
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
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-0.5 bg-yellow rounded-full" />
              <p className="text-yellow-dark font-semibold text-sm uppercase tracking-wider">Что мы предлагаем</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ключевые услуги
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Мы предоставляем комплексный спектр услуг для безопасной и эффективной эксплуатации газовой инфраструктуры. Наша команда специалистов работает 24/7 для обеспечения надёжности.
            </p>
            <Button asChild>
              <Link href="/services">
                Все услуги
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
              alt="Диспетчерский центр управления газовой инфраструктурой"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Основные направления деятельности</h3>
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
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full bg-yellow/15 text-yellow-dark text-xs font-semibold border border-yellow/20"
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
