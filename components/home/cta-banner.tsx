import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/ui/button";

export function CtaBanner() {
  return (
    <section className="py-16 md:py-20 bg-[oklch(0.15_0.04_255)]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-12 md:px-12 md:py-16">
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-8 right-32 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
          {/* Yellow accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow/60 via-yellow to-yellow/60 rounded-t-3xl" />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-0.5 bg-yellow rounded-full" />
                <span className="text-yellow text-xs font-semibold uppercase tracking-wider">Сотрудничество</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Готовы начать сотрудничество?
              </h2>
              <p className="text-white/90 leading-relaxed">
                Оставьте заявку, и наши специалисты свяжутся с вами в течение
                одного рабочего дня для обсуждения условий договора.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button
                asChild
                size="lg"
                className="bg-yellow text-yellow-foreground hover:bg-yellow-light! font-semibold"
              >
                <Link href="/contacts">
                  Оставить заявку
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white bg-white/5 hover:bg-white/15 hover:text-white"
              >
                <a href="tel:+375172060000">
                  <Phone className="mr-2 w-4 h-4" />
                  Позвонить
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
