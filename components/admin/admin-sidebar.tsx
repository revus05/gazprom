"use client";

import { FileText, LayoutDashboard, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/images/logo.gif";
import { LogoutButton } from "./logout-button";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Дашборд", href: "/admin" },
  { icon: FileText, label: "Заявки", href: "/admin/submissions" },
  { icon: Newspaper, label: "Новости", href: "/admin/news" },
];

interface AdminSidebarProps {
  username: string;
}

export function AdminSidebar({ username }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card">
      {/* Логотип */}
      <div className="flex h-16 gap-2 border-b p-2">
        <Image
          src={logo.src}
          width={120}
          height={64}
          alt="logo"
          className="h-full w-auto"
        />
      </div>

      {/* Навигация */}
      <nav className="flex-1 space-y-1 p-3">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
          const active =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Пользователь + выход */}
      <div className="border-t p-3 space-y-1">
        <p className="px-3 py-1 text-xs text-muted-foreground truncate">
          {username}
        </p>
        <LogoutButton variant="full" />
      </div>
    </aside>
  );
}
