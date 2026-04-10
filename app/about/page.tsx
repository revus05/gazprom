import {
  Award,
  Building2,
  Clock,
  Eye,
  Map,
  Pipette,
  Shield,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import { CtaBanner } from "@/components/home/cta-banner";

const timeline = [
  {
    year: "1994",
    title: "Основание компании",
    desc: "Создание ООО «Газпром трансгаз Беларусь» как дочерней компании ПАО «Газпром» для обеспечения транзита и транспортировки газа через Беларусь.",
  },
  {
    year: "1999",
    title: "Расширение сети",
    desc: "Завершение строительства второй нитки газопровода «Ямал — Европа», увеличение пропускной способности системы до 33 млрд. м³/год.",
  },
  {
    year: "2007",
    title: "Модернизация ГИС",
    desc: "Внедрение геоинформационной системы управления газотранспортной инфраструктурой. Переход на автоматизированное управление ГРС.",
  },
  {
    year: "2015",
    title: "Сертификация ISO",
    desc: "Получение сертификата системы менеджмента качества ISO 9001:2015 и сертификата системы экологического менеджмента ISO 14001:2015.",
  },
  {
    year: "2019",
    title: "Цифровизация",
    desc: "Запуск системы удалённого мониторинга всех объектов инфраструктуры в режиме реального времени. Создание единого диспетчерского центра.",
  },
  {
    year: "2024",
    title: "30 лет надёжности",
    desc: "30-летний юбилей компании. Обслуживаем более 6 500 км газопроводов, обеспечиваем газом свыше 250 крупных промышленных предприятий республики.",
  },
];

const infra = [
  { icon: Pipette, value: "6 500+", label: "км газопроводов" },
  { icon: Building2, value: "150+", label: "газораспределительных станций" },
  { icon: Wrench, value: "12", label: "линейных производственных управлений" },
  { icon: Map, value: "6", label: "областей Беларуси" },
  { icon: Users, value: "3 200+", label: "сотрудников" },
  { icon: Clock, value: "24/7", label: "аварийно-диспетчерская служба" },
];

const certs = [
  {
    title: "Лицензия Министерства энергетики РБ",
    num: "02330/0000000",
    desc: "Эксплуатация взрывоопасных объектов и сетей газоснабжения",
  },
  {
    title: "ISO 9001:2015",
    num: "Рег. № BY/112 05.01.1500-003",
    desc: "Система менеджмента качества",
  },
  {
    title: "ISO 14001:2015",
    num: "Рег. № BY/112 05.14.1500-002",
    desc: "Система экологического менеджмента",
  },
  {
    title: "OHSAS 18001",
    num: "Рег. № BY/112 05.18.1500-001",
    desc: "Система менеджмента профессиональной безопасности и здоровья",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-[oklch(0.15_0.04_255)] py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="relative container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <p className="text-[oklch(0.72_0.14_255)] font-semibold text-sm uppercase tracking-wider mb-3">
            О компании
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Газпром трансгаз Беларусь
          </h1>
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            Ведущий оператор газотранспортной системы Республики Беларусь. 30
            лет надёжности, опыта и профессионализма.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
            <div className="rounded-2xl border border-border p-8 bg-muted/20">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-3">
                Наша миссия
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Обеспечить бесперебойное, безопасное и экологически
                ответственное газоснабжение промышленных предприятий и объектов
                энергетики Республики Беларусь, создавая условия для устойчивого
                развития национальной экономики.
              </p>
            </div>
            <div className="rounded-2xl border border-border p-8 bg-muted/20">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-3">
                Наше видение
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Быть технологически передовым и социально ответственным
                оператором газотранспортной системы, который внедряет цифровые
                технологии, повышает энергоэффективность и формирует
                долгосрочные партнёрские отношения с клиентами.
              </p>
            </div>
          </div>

          {/* Values */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Наши ценности
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Shield,
                label: "Безопасность",
                desc: "Приоритет промышленной и экологической безопасности",
              },
              {
                icon: Award,
                label: "Качество",
                desc: "Соответствие международным стандартам ISO",
              },
              {
                icon: Users,
                label: "Партнёрство",
                desc: "Долгосрочные отношения с каждым клиентом",
              },
              {
                icon: Clock,
                label: "Надёжность",
                desc: "99.9% бесперебойность поставок",
              },
            ].map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.label}
                  className="text-center p-5 rounded-xl border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/8 mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="font-semibold text-foreground text-sm mb-1">
                    {v.label}
                  </div>
                  <div className="text-xs text-muted-foreground">{v.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              С 1994 по сегодня
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              История компании
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-white shadow-sm md:-translate-x-1.5 translate-y-1.5" />

                  {/* Year badge (desktop: alternating side) */}
                  <div
                    className={`pl-10 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}
                  >
                    <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-sm font-bold mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                  </div>
                  <div
                    className={`pl-10 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-12" : "md:text-right md:pr-12"}`}
                  >
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Масштаб операций
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Наша инфраструктура
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {infra.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="text-center p-6 rounded-2xl border border-border bg-muted/20 hover:border-primary/30 hover:bg-primary/3 transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/8 mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {item.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Документы
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Лицензии и сертификаты
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certs.map((cert) => (
              <div
                key={cert.title}
                className="bg-white rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs text-primary font-medium mb-2">
                  {cert.num}
                </p>
                <p className="text-xs text-muted-foreground">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
