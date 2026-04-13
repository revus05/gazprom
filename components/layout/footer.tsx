import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О компании" },
  { href: "/services", label: "Услуги" },
  { href: "/news", label: "Новости" },
  { href: "/contacts", label: "Контакты" },
];

const services = [
  "Транспортировка газа",
  "Техническое обслуживание",
  "Газораспределение",
  "Коммерческий учёт",
  "Аварийное обеспечение",
  "Проектирование",
];

export function Footer() {
  return (
    <footer className="bg-[oklch(0.15_0.04_255)] text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Навигация
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Услуги
            </h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Контакты
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[oklch(0.72_0.14_255)] mt-0.5 shrink-0" />
                <span className="text-sm text-white/75">
                  220121, г. Минск,
                  <br />
                  ул. Притыцкого, 2
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[oklch(0.72_0.14_255)] shrink-0" />
                <a
                  href="tel:+375172060000"
                  className="text-sm text-white/75 hover:text-white transition-colors"
                >
                  +375 (17) 206-00-00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[oklch(0.72_0.14_255)] shrink-0" />
                <a
                  href="mailto:info@gtb.by"
                  className="text-sm text-white/75 hover:text-white transition-colors"
                >
                  info@gtb.by
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/55">
            © {new Date().getFullYear()} ООО «Газпром трансгаз Беларусь». Все
            права защищены.
          </p>
          <p className="text-xs text-white/55">
            Лицензия № 02330/0000000 Министерства энергетики РБ
          </p>
        </div>
      </div>
    </footer>
  );
}
