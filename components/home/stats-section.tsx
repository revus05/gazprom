import { Award, Building2, Clock, Pipette } from "lucide-react";

const stats = [
  {
    value: "6 500+",
    label: "км газопроводов",
    description: "Общая протяжённость обслуживаемой газотранспортной системы",
    icon: Pipette,
  },
  {
    value: "30+",
    label: "лет опыта",
    description:
      "Работаем с предприятиями Беларуси с момента основания в 1994 году",
    icon: Award,
  },
  {
    value: "250+",
    label: "корпоративных клиентов",
    description: "Крупные промышленные предприятия, заводы и производства",
    icon: Building2,
  },
  {
    value: "99.9%",
    label: "бесперебойность",
    description: "Гарантированная надёжность поставки газа по договору",
    icon: Clock,
  },
];

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <img
          src="https://magazine.neftegaz.ru/upload/medialibrary/8f4/edr8cr3u1m5911352kmsv39dm0pugs4f/1.jpg"
          alt="Газопровод и трубопроводная система"
          className="w-auto mx-auto h-full object-fit mb-12 rounded-2xl shadow-lg max-h-[450px]"
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.value} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/8 mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-yellow-dark mb-2">
                  {stat.label}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed hidden md:block">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
