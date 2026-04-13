"use client"

import { useActionState, useRef, useState } from "react"
import Image from "next/image"
import { Loader2, UploadCloud, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { NewsItem } from "@/lib/news"

interface NewsFormProps {
  news?: NewsItem
  action: (
    prevState: { error?: string } | null,
    formData: FormData,
  ) => Promise<{ error: string }>
  submitLabel: string
}

export function NewsForm({ news, action, submitLabel }: NewsFormProps) {
  const [state, formAction, pending] = useActionState(action, null)

  const [coverImage, setCoverImage] = useState<string>(
    news?.coverImage ?? "",
  )
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [published, setPublished] = useState(news?.published ?? false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError("")
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Ошибка загрузки")
      setCoverImage(data.url as string)
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Ошибка загрузки")
    } finally {
      setUploading(false)
    }
  }

  return (
    <form action={formAction} className="space-y-6 max-w-2xl">
      {/* Скрытые поля */}
      <input type="hidden" name="coverImage" value={coverImage} />
      <input type="hidden" name="published" value={String(published)} />

      {/* Заголовок */}
      <div className="space-y-2">
        <Label htmlFor="title">Заголовок *</Label>
        <Input
          id="title"
          name="title"
          defaultValue={news?.title}
          placeholder="Введите заголовок новости"
          required
          maxLength={255}
        />
      </div>

      {/* Обложка */}
      <div className="space-y-2">
        <Label>Обложка</Label>
        <div className="flex flex-col gap-3">
          {coverImage ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border">
              <Image
                src={coverImage}
                alt="Обложка"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setCoverImage("")
                  if (fileRef.current) fileRef.current.value = ""
                }}
                className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80 transition-colors"
                aria-label="Удалить изображение"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <label
              className={`flex flex-col items-center justify-center gap-2 w-full aspect-video rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
                uploading
                  ? "border-primary/40 bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              {uploading ? (
                <Loader2 className="size-6 text-primary animate-spin" />
              ) : (
                <UploadCloud className="size-6 text-muted-foreground" />
              )}
              <span className="text-sm text-muted-foreground">
                {uploading ? "Загрузка…" : "Нажмите для загрузки изображения"}
              </span>
              <span className="text-xs text-muted-foreground/70">
                JPG, PNG, WebP — до 5 МБ
              </span>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
          )}
          {uploadError && (
            <p className="text-sm text-destructive">{uploadError}</p>
          )}
        </div>
      </div>

      {/* Текст */}
      <div className="space-y-2">
        <Label htmlFor="content">Текст новости *</Label>
        <textarea
          id="content"
          name="content"
          defaultValue={news?.content}
          placeholder="Введите текст новости…"
          required
          rows={12}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
        />
      </div>

      {/* Опубликовано */}
      <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-muted/20">
        <button
          type="button"
          role="switch"
          aria-checked={published}
          onClick={() => setPublished(!published)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            published ? "bg-primary" : "bg-input"
          }`}
        >
          <span
            className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
              published ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <div>
          <p className="text-sm font-medium">
            {published ? "Опубликовано" : "Черновик"}
          </p>
          <p className="text-xs text-muted-foreground">
            {published
              ? "Новость видна всем посетителям сайта"
              : "Новость скрыта от посетителей"}
          </p>
        </div>
      </div>

      {/* Ошибка сервера */}
      {state?.error && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-2">
          {state.error}
        </p>
      )}

      {/* Кнопки */}
      <div className="flex gap-3">
        <Button type="submit" disabled={pending || uploading}>
          {pending && <Loader2 className="size-4 mr-2 animate-spin" />}
          {submitLabel}
        </Button>
        <Button type="button" variant="outline" asChild>
          <a href="/admin/news">Отмена</a>
        </Button>
      </div>
    </form>
  )
}
