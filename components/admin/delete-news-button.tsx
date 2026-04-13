"use client"

import { Button } from "@/components/ui/button"
import { deleteNewsAction } from "@/app/actions/news"

interface DeleteNewsButtonProps {
  id: number
  title: string
}

export function DeleteNewsButton({ id, title }: DeleteNewsButtonProps) {
  return (
    <form action={deleteNewsAction}>
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        size="sm"
        variant="ghost"
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
        onClick={(e) => {
          if (!confirm(`Удалить новость «${title}»? Это действие необратимо.`)) {
            e.preventDefault()
          }
        }}
      >
        Удалить
      </Button>
    </form>
  )
}
