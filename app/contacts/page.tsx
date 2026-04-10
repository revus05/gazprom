import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { ContactForm } from "@/components/contacts/contact-form"

const contactCards = [
  {
    icon: MapPin,
    title: "Адрес",
    lines: ["220121, Республика Беларусь,", "г. Минск, ул. Притыцкого, 2"],
  },
  {
    icon: Phone,
    title: "Телефон / Факс",
    lines: ["+375 (17) 206-00-00", "Факс: +375 (17) 206-00-01"],
    href: "tel:+375172060000",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@gtb.by", "contracts@gtb.by"],
    href: "mailto:info@gtb.by",
  },
  {
    icon: Clock,
    title: "Режим работы",
    lines: ["Пн–Пт: 08:30 – 17:30", "Аварийная служба: 24/7"],
  },
]

export default function ContactsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-[oklch(0.15_0.04_255)] py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl -translate-y-1/2 translate-x-1/3" />
        </div>
        <div className="relative container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <p className="text-[oklch(0.72_0.14_255)] font-semibold text-sm uppercase tracking-wider mb-3">Связаться с нами</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Контакты</h1>
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            Оставьте заявку, и мы свяжемся с вашей организацией в течение одного рабочего дня.
          </p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="py-12 md:py-16 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((card) => {
              const Icon = card.icon
              return (
                <div key={card.title} className="bg-white rounded-2xl p-6 border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{card.title}</h3>
                  {card.lines.map((line, i) =>
                    i === 0 && card.href ? (
                      <a
                        key={line}
                        href={card.href}
                        className="block text-sm text-primary hover:underline"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={line} className="text-sm text-muted-foreground">{line}</p>
                    )
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <div className="mb-10">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Форма обратной связи</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Оставить заявку</h2>
            <p className="text-muted-foreground max-w-xl">
              Заполните форму ниже, и наш специалист свяжется с представителем вашей организации
              для обсуждения условий сотрудничества.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-border p-6 md:p-10 shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
