import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contacts/contact-form";

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
];

export default function ContactsPage() {
  return (
    <>
      {/* Page Hero */}
      <section
        className="py-20 md:py-28 relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1664300121717-903f7c18decc?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[oklch(0.12_0.04_255)]/88" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 size-125 rounded-full bg-yellow/8 blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-0.5 bg-yellow rounded-full" />
            <p className="text-yellow font-semibold text-sm uppercase tracking-wider">
              Связаться с нами
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Контакты
          </h1>
          <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
            Оставьте заявку, и мы свяжемся с вашей организацией в течение одного
            рабочего дня.
          </p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="py-12 md:py-16 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-white rounded-2xl p-6 border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {card.title}
                  </h3>
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
                      <p key={line} className="text-sm text-muted-foreground">
                        {line}
                      </p>
                    ),
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-0.5 bg-yellow rounded-full" />
                <p className="text-yellow-dark font-semibold text-sm uppercase tracking-wider">
                  Форма обратной связи
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Оставить заявку
              </h2>
              <p className="text-muted-foreground max-w-xl mb-8">
                Заполните форму ниже, и наш специалист свяжется с представителем
                вашей организации для обсуждения условий сотрудничества.
              </p>

              <div className="bg-white rounded-2xl border border-border p-6 md:p-10 shadow-sm">
                <ContactForm />
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg hidden lg:block">
              <img
                src="https://www.shutterstock.com/image-photo/vertical-side-view-beautiful-blond-600nw-2261833293.jpg"
                alt="Современный офис и центр управления"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
