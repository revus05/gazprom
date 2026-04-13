"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useCallback, useTransition } from "react"
import { Search, ArrowUpDown } from "lucide-react"

const SORT_OPTIONS = [
  { value: "newest", label: "Сначала новые" },
  { value: "oldest", label: "Сначала старые" },
  { value: "az",     label: "А → Я"          },
] as const

type SortValue = (typeof SORT_OPTIONS)[number]["value"]

export function NewsFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const q = searchParams.get("q") ?? ""
  const sort = (searchParams.get("sort") ?? "newest") as SortValue

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())
      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      }
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      })
    },
    [router, pathname, searchParams],
  )

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      {/* Поиск */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <input
          type="search"
          placeholder="Поиск по новостям..."
          defaultValue={q}
          onChange={(e) => updateParams({ q: e.target.value })}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
        />
        {isPending && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 size-4 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
        )}
      </div>

      {/* Сортировка */}
      <div className="relative shrink-0">
        <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <select
          value={sort}
          onChange={(e) => updateParams({ sort: e.target.value })}
          className="appearance-none pl-9 pr-8 py-2.5 rounded-xl border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
