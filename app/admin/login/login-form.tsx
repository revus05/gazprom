"use client"

import { useRef } from "react"
import { loginAction } from "@/app/actions/admin-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LockKeyhole } from "lucide-react"

interface LoginFormProps {
  hasError: boolean
}

export function LoginForm({ hasError }: LoginFormProps) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form ref={formRef} action={loginAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Логин</Label>
        <Input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          placeholder="Введите логин"
          className={hasError ? "border-destructive" : ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Пароль</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Введите пароль"
          className={hasError ? "border-destructive" : ""}
        />
      </div>

      {hasError && (
        <p className="text-sm text-destructive font-medium">
          Неверный логин или пароль
        </p>
      )}

      <Button type="submit" className="w-full gap-2">
        <LockKeyhole className="size-4" />
        Войти
      </Button>
    </form>
  )
}
