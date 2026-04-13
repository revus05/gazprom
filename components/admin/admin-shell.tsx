import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/actions/admin-auth";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "./admin-sidebar";

interface AdminShellProps {
  username: string;
  title: string;
  children: React.ReactNode;
}

export function AdminShell({ username, title, children }: AdminShellProps) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar username={username} />

      <div className="flex flex-1 flex-col min-w-0">
        {/* Топбар */}
        <header className="flex h-16 items-center justify-between border-b bg-card px-6 shrink-0">
          <h1 className="text-lg font-semibold">{title}</h1>
          <form action={logoutAction} className="md:hidden">
            <Button variant="ghost" size="icon" type="submit" title="Выйти">
              <LogOut className="size-4" />
            </Button>
          </form>
        </header>

        {/* Контент */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
