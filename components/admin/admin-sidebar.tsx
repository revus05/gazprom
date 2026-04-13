"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logoutAction } from "@/app/actions/admin-auth"

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Дашборд", href: "/admin" },
  { icon: FileText, label: "Заявки", href: "/admin/submissions" },
]

interface AdminSidebarProps {
  username: string
}

export function AdminSidebar({ username }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card">
      {/* Логотип */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold shrink-0">
          G
        </div>
        <span className="font-semibold text-sm leading-tight">
          Газпром
          <br />
          <span className="text-muted-foreground font-normal">
            Панель управления
          </span>
        </span>
      </div>

      {/* Навигация */}
      <nav className="flex-1 space-y-1 p-3">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
          const active =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href)
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
          )
        })}
      </nav>

      {/* Пользователь + выход */}
      <div className="border-t p-3 space-y-1">
        <p className="px-3 py-1 text-xs text-muted-foreground truncate">
          {username}
        </p>
        <form action={logoutAction}>
          <Button
            variant="ghost"
            type="submit"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="size-4" />
            Выйти
          </Button>
        </form>
      </div>
    </aside>
  )
}
