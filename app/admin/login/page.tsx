import { LoginForm } from "./login-form"

// Страница логина рендерится на сервере — данные о наличии ошибки
// подтягиваются через searchParams ещё до отправки HTML клиенту (SSR, без FOUC)
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const sp = await searchParams
  const hasError = sp.error === "1"

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm">
        {/* Логотип / заголовок */}
        <div className="mb-8 text-center space-y-1">
          <div className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mb-3">
            G
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Панель управления</h1>
          <p className="text-sm text-muted-foreground">
            Газпром Трансгаз Беларусь
          </p>
        </div>

        {/* Карточка формы */}
        <div className="rounded-xl border bg-card shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-5">Вход в систему</h2>
          {/* LoginForm — client component, но hasError уже известен на сервере */}
          <LoginForm hasError={hasError} />
        </div>
      </div>
    </div>
  )
}
