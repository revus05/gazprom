"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "public/images/logo.gif";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О компании" },
  { href: "/services", label: "Услуги" },
  { href: "/news", label: "Новости" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-white/95 backdrop-blur-md",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 pb-2 pt-1 h-full"
          >
            <Image
              src={logo.src}
              width={120}
              height={64}
              alt="logo"
              className="h-full w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-base font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "text-primary bg-primary/8"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link href="/contacts">Оставить заявку</Link>
            </Button>
            <Button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Меню"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                pathname === link.href
                  ? "text-primary bg-primary/8"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted",
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Button asChild className="w-full" size="sm">
              <Link href="/contacts">Оставить заявку</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
