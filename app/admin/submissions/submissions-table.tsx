"use client"

import { useState, useTransition } from "react"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import type { Submission } from "@/lib/submissions"
import {
  type SubmissionStatus,
  STATUS_LABELS,
  STATUS_STYLES,
} from "@/lib/submission-constants"
import { contractorTypeLabels, requestTypeLabels } from "@/lib/schemas/contact-form"
import { updateStatusAction } from "@/app/actions/admin-submissions"
import { Input } from "@/components/ui/input"

interface SubmissionsTableProps {
  submissions: Submission[]
}

export function SubmissionsTable({ submissions }: SubmissionsTableProps) {
  const [search, setSearch] = useState("")
  const [expandedId, setExpandedId] = useState<number | null>(null)
  // Optimistic статусы: { [id]: status }
  const [optimistic, setOptimistic] = useState<Record<number, SubmissionStatus>>({})
  const [, startTransition] = useTransition()

  const filtered = submissions.filter((s) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      s.organizationName.toLowerCase().includes(q) ||
      s.contactName.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      String(s.id).includes(q)
    )
  })

  const toggle = (id: number) =>
    setExpandedId((prev) => (prev === id ? null : id))

  const handleStatusChange = (id: number, status: SubmissionStatus) => {
    setOptimistic((prev) => ({ ...prev, [id]: status }))
    startTransition(() => {
      updateStatusAction(id, status)
    })
  }

  return (
    <div className="space-y-4">
      {/* Поиск */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Поиск по организации, ФИО, email или номеру..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        {/* Шапка таблицы */}
        <div className="hidden sm:grid grid-cols-[4rem_1fr_10rem_8rem_1.5rem] items-center gap-4 px-5 py-3 border-b bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          <span>№</span>
          <span>Организация / тип обращения</span>
          <span>Статус</span>
          <span className="text-right">Дата</span>
          <span />
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground">
            {search ? "Ничего не найдено" : "Заявок пока нет"}
          </div>
        ) : (
          <div className="divide-y">
            {filtered.map((s) => {
              const status = optimistic[s.id] ?? s.status
              const isOpen = expandedId === s.id

              return (
                <div key={s.id}>
                  {/* Строка таблицы */}
                  <button
                    type="button"
                    onClick={() => toggle(s.id)}
                    className="w-full grid grid-cols-[4rem_1fr] sm:grid-cols-[4rem_1fr_10rem_8rem_1.5rem] items-center gap-4 px-5 py-3 hover:bg-muted/30 text-sm text-left transition-colors"
                  >
                    <span className="font-mono text-muted-foreground">
                      #{s.id}
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{s.organizationName}</p>
                      <p className="text-xs text-muted-foreground">
                        {requestTypeLabels[s.requestType]}
                      </p>
                    </div>
                    <span
                      className={`hidden sm:inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
                    >
                      {STATUS_LABELS[status]}
                    </span>
                    <span className="hidden sm:block text-muted-foreground text-right text-xs">
                      {new Date(s.createdAt).toLocaleDateString("ru-RU")}
                    </span>
                    <span className="hidden sm:flex justify-center text-muted-foreground">
                      {isOpen ? (
                        <ChevronUp className="size-4" />
                      ) : (
                        <ChevronDown className="size-4" />
                      )}
                    </span>
                  </button>

                  {/* Развёрнутые детали */}
                  {isOpen && (
                    <div className="px-5 py-5 bg-muted/20 border-t space-y-5 text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                        <Field
                          label="Тип контрагента"
                          value={contractorTypeLabels[s.contractorType]}
                        />
                        <Field label="УНП" value={s.unp} />
                        <Field
                          label="Контактное лицо"
                          value={`${s.contactName}, ${s.contactPosition}`}
                        />
                        <Field
                          label="Email"
                          value={
                            <a
                              href={`mailto:${s.email}`}
                              className="text-primary hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {s.email}
                            </a>
                          }
                        />
                        <Field
                          label="Дата обращения"
                          value={new Date(s.createdAt).toLocaleString("ru-RU")}
                        />
                        {/* Мобильный статус */}
                        <div className="sm:hidden">
                          <Field
                            label="Статус"
                            value={
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
                              >
                                {STATUS_LABELS[status]}
                              </span>
                            }
                          />
                        </div>
                      </div>

                      {/* Текст обращения */}
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                          Описание обращения
                        </p>
                        <p className="whitespace-pre-wrap rounded-lg border bg-background px-4 py-3 leading-relaxed">
                          {s.message}
                        </p>
                      </div>

                      {/* Смена статуса */}
                      <div className="flex items-center gap-3 pt-1">
                        <label
                          htmlFor={`status-${s.id}`}
                          className="text-xs font-medium text-muted-foreground uppercase tracking-wide shrink-0"
                        >
                          Изменить статус:
                        </label>
                        <select
                          id={`status-${s.id}`}
                          value={status}
                          onChange={(e) =>
                            handleStatusChange(
                              s.id,
                              e.target.value as SubmissionStatus,
                            )
                          }
                          className="text-sm border rounded-md px-3 py-1.5 bg-background focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                        >
                          <option value="new">Новая</option>
                          <option value="in_progress">В работе</option>
                          <option value="done">Выполнена</option>
                          <option value="rejected">Отклонена</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {filtered.length > 0 && (
        <p className="text-xs text-muted-foreground text-right">
          {filtered.length} из {submissions.length} заявок
        </p>
      )}
    </div>
  )
}

function Field({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
        {label}
      </p>
      <div className="text-sm">{value}</div>
    </div>
  )
}
