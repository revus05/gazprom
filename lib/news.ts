import fs from "node:fs"
import path from "node:path"

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "news.json")

export interface NewsItem {
  id: number
  title: string
  content: string
  coverImage: string | null
  createdAt: string
  updatedAt: string
  published: boolean
}

function ensureFile(): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8")
}

export function readNews(): NewsItem[] {
  try {
    ensureFile()
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as NewsItem[]
  } catch {
    return []
  }
}

export function getNewsById(id: number): NewsItem | null {
  const all = readNews()
  return all.find((n) => n.id === id) ?? null
}

export function createNewsItem(
  data: Omit<NewsItem, "id" | "createdAt" | "updatedAt">,
): NewsItem {
  const all = readNews()
  const maxId = all.length > 0 ? Math.max(...all.map((n) => n.id)) : 0
  const item: NewsItem = {
    ...data,
    id: maxId + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  all.unshift(item)
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), "utf-8")
  return item
}

export function updateNewsItem(
  id: number,
  data: Partial<Omit<NewsItem, "id" | "createdAt">>,
): NewsItem | null {
  const all = readNews()
  const idx = all.findIndex((n) => n.id === id)
  if (idx === -1) return null
  all[idx] = { ...all[idx], ...data, updatedAt: new Date().toISOString() }
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), "utf-8")
  return all[idx]
}

export function deleteNewsItem(id: number): boolean {
  const all = readNews()
  const idx = all.findIndex((n) => n.id === id)
  if (idx === -1) return false
  all.splice(idx, 1)
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), "utf-8")
  return true
}
