import { ArrowRight, Handshake, Scale, Shield, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/ui/button";

const advantages = [
  {
    icon: Shield,
    title: "Надёжность и безопасность",
    desc: "Соответствие всем нормам промышленной безопасности РБ",
  },
  {
    icon: Users,
    title: "Профессиональная команда",
    desc: "Более 3 000 квалифицированных специалистов",
  },
  {
    icon: Scale,
    title: "Юридическая чистота",
    desc: "Все работы выполняются по договорам с полным пакетом документов",
  },
  {
    icon: Handshake,
    title: "Долгосрочное партнёрство",
    desc: "Индивидуальные условия сотрудничества для каждого клиента",
  },
];

export function AboutTeaser() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              О компании
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Три десятилетия на страже газоснабжения Беларуси
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ООО «Газпром трансгаз Беларусь» является дочерней компанией ПАО
              «Газпром» и осуществляет транспортировку природного газа по
              территории Республики Беларусь с 1994 года.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Мы обеспечиваем газоснабжение крупнейших промышленных предприятий,
              электростанций и коммунальных объектов республики, гарантируя
              высокое качество и бесперебойность поставок в строгом соответствии
              с договорными обязательствами.
            </p>
            <Button asChild>
              <Link href="/about">
                Подробнее о компании
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://static.tildacdn.biz/tild3461-3935-4161-b338-633930663932/6994-min1_1680_900.jpg"
                alt="Современное газовое оборудование"
                className="w-full h-[300px] object-cover"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {advantages.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-5 rounded-xl border border-border bg-muted/20 hover:border-primary/30 hover:bg-primary/3 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
