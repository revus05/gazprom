import { Pipe, Buildings, Clock, Certificate } from "@phosphor-icons/react/dist/ssr"

const stats = [
  {
    value: "6 500+",
    label: "км газопроводов",
    description: "Общая протяжённость обслуживаемой газотранспортной системы",
    icon: Pipe,
  },
  {
    value: "30+",
    label: "лет опыта",
    description: "Работаем с предприятиями Беларуси с момента основания в 1994 году",
    icon: Certificate,
  },
  {
    value: "250+",
    label: "корпоративных клиентов",
    description: "Крупные промышленные предприятия, заводы и производства",
    icon: Buildings,
  },
  {
    value: "99.9%",
    label: "бесперебойность",
    description: "Гарантированная надёжность поставки газа по договору",
    icon: Clock,
  },
]

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.value} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/8 mb-4">
                  <Icon weight="duotone" className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-primary mb-2">{stat.label}</div>
                <p className="text-xs text-muted-foreground leading-relaxed hidden md:block">{stat.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
