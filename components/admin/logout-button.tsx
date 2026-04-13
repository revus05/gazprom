"use client"

import { useRef } from "react"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { logoutAction } from "@/app/actions/admin-auth"

interface LogoutButtonProps {
  variant?: "full" | "icon"
}

export function LogoutButton({ variant = "full" }: LogoutButtonProps) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <>
      <form ref={formRef} action={logoutAction} className="hidden" />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          {variant === "icon" ? (
            <Button variant="ghost" size="icon" title="Выйти">
              <LogOut className="size-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="size-4" />
              Выйти
            </Button>
          )}
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Выйти из панели управления?</AlertDialogTitle>
            <AlertDialogDescription>
              Вы будете перенаправлены на страницу входа. Несохранённые изменения
              будут потеряны.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={() => formRef.current?.requestSubmit()}>
              Выйти
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
