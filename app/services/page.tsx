import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Gauge,
  GitFork,
  HeartHandshake,
  Layers2,
  Pipette,
  Search,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { CtaBanner } from "@/components/home/cta-banner";
import { Button } from "@/ui/button";

const services = [
  {
    icon: Pipette,
    title: "Транспортировка природного газа",
    description:
      "Обеспечиваем надёжную и бесперебойную транспортировку природного газа по разветвлённой сети магистральных и межсистемных газопроводов на всей территории Республики Беларусь.",
    includes: [
      "Прокачка газа по магистральным газопроводам",
      "Обслуживание отводов к предприятиям",
      "Управление потоками газа",
      "Мониторинг давления и расхода в режиме реального времени",
    ],
  },
  {
    icon: Wrench,
    title: "Техническое обслуживание газопроводов",
    description:
      "Полный комплекс работ по техническому обслуживанию и ремонту объектов газотранспортной инфраструктуры: от плановых осмотров до капитального ремонта линейной части.",
    includes: [
      "Плановые технические осмотры",
      "Текущий и капитальный ремонт",
      "Очистка внутренней полости газопроводов",
      "Замена запорной арматуры и оборудования",
    ],
  },
  {
    icon: GitFork,
    title: "Услуги газораспределения",
    description:
      "Организация и эксплуатация систем газораспределения для промышленных предприятий, включая проектирование, монтаж и подключение к существующей инфраструктуре.",
    includes: [
      "Подключение к распределительным сетям",
      "Эксплуатация ГРС и ГРП",
      "Регулирование параметров газа",
      "Техническое сопровождение объектов",
    ],
  },
  {
    icon: BarChart3,
    title: "Коммерческий учёт газа",
    description:
      "Установка, поверка и эксплуатационное обслуживание узлов коммерческого учёта газа. Обеспечение метрологической точности в соответствии с требованиями законодательства Республики Беларусь.",
    includes: [
      "Проектирование узлов учёта",
      "Монтаж и ввод в эксплуатацию",
      "Поверка и калибровка средств измерений",
      "Обработка и архивирование данных учёта",
    ],
  },
  {
    icon: Gauge,
    title: "Регулирование давления газа",
    description:
      "Монтаж, наладка и обслуживание газорегуляторных пунктов и установок (ГРП, ГРУ) для поддержания необходимого рабочего давления газа на объектах потребителей.",
    includes: [
      "Монтаж газорегуляторных пунктов",
      "Настройка регуляторов давления",
      "Техническое обслуживание ГРП и ГРУ",
      "Автоматизация управления давлением",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Аварийно-диспетчерское обеспечение",
    description:
      "Круглосуточная аварийно-диспетчерская служба для оперативного реагирования на нештатные ситуации на газотранспортных объектах и объектах потребителей.",
    includes: [
      "Круглосуточный диспетчерский центр",
      "Аварийные бригады быстрого реагирования",
      "Ликвидация утечек и аварий",
      "Восстановление газоснабжения в кратчайшие сроки",
    ],
  },
  {
    icon: Layers2,
    title: "Проектирование и строительство",
    description:
      "Разработка проектной документации и строительство объектов газовой инфраструктуры под ключ: от технического задания до ввода объекта в эксплуатацию.",
    includes: [
      "Разработка ТЭО и проектной документации",
      "Согласование с надзорными органами",
      "Строительно-монтажные работы",
      "Пуско-наладка и сдача в эксплуатацию",
    ],
  },
  {
    icon: Search,
    title: "Экспертиза и диагностика",
    description:
      "Техническая диагностика и экспертиза промышленной безопасности объектов газоснабжения, продление ресурса оборудования и газопроводов, дефектоскопия.",
    includes: [
      "Внутритрубная дефектоскопия",
      "Экспертиза промышленной безопасности",
      "Электрохимическая защита",
      "Продление назначенного ресурса",
    ],
  },
];

const steps = [
  {
    step: "01",
    title: "Подача заявки",
    desc: "Заполните форму на сайте или позвоните нам. Укажите тип необходимой услуги и данные вашей организации.",
  },
  {
    step: "02",
    title: "Консультация",
    desc: "Специалист свяжется с вами в течение одного рабочего дня для уточнения требований и предварительного расчёта.",
  },
  {
    step: "03",
    title: "Заключение договора",
    desc: "Подготовка и подписание договора на оказание услуг с учётом всех согласованных условий.",
  },
  {
    step: "04",
    title: "Выполнение работ",
    desc: "Наши специалисты приступают к работам в согласованные сроки. Вы получаете полный пакет исполнительной документации.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-[oklch(0.15_0.04_255)] py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <p className="text-[oklch(0.72_0.14_255)] font-semibold text-sm uppercase tracking-wider mb-3">
            Что мы предлагаем
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Наши услуги
          </h1>
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            Полный спектр услуг в области газоснабжения и эксплуатации
            газотранспортной инфраструктуры для промышленных предприятий
            Республики Беларусь.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://img.belta.by/images/storage/news/with_archive/2023/000022_1700041389_599654_big.jpg"
                alt="Промышленное газовое оборудование"
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Что мы предлагаем
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Полный спектр услуг
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                От транспортировки природного газа до технического обслуживания
                сложного оборудования. Мы обеспечиваем комплексные решения для
                безопасной и эффективной эксплуатации газовой инфраструктуры
                вашего предприятия.
              </p>
              <ul className="space-y-4">
                {[
                  "Лицензированная деятельность",
                  "Опытные специалисты",
                  "Современное оборудование",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Наши основные услуги
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group bg-white rounded-2xl p-6 md:p-8 border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-5 mb-5">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground leading-tight mt-1">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground/75">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Как мы работаем
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Порядок сотрудничества
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.step} className="relative">
                <div className="hidden lg:block absolute top-6 left-0 w-full h-px bg-border -z-0" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-sm mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-12 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Нужна консультация?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Наши специалисты помогут подобрать оптимальный пакет услуг под
            потребности вашего предприятия.
          </p>
          <Button asChild size="lg">
            <Link href="/contacts">
              Оставить заявку
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
