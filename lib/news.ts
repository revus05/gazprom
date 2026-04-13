import { getDb, ensureTable } from "@/lib/db"

export interface NewsItem {
  id: number
  title: string
  content: string
  coverImage: string | null
  createdAt: string
  updatedAt: string
  published: boolean
}

// Маппинг snake_case строк БД → camelCase интерфейс
function toNewsItem(row: Record<string, unknown>): NewsItem {
  return {
    id: row.id as number,
    title: row.title as string,
    content: row.content as string,
    coverImage: (row.cover_image as string | null) ?? null,
    published: row.published as boolean,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  }
}

export async function readNews(): Promise<NewsItem[]> {
  await ensureTable()
  const sql = getDb()
  const rows = await sql`
    SELECT * FROM news ORDER BY created_at DESC
  `
  return rows.map(toNewsItem)
}

export async function getNewsById(id: number): Promise<NewsItem | null> {
  await ensureTable()
  const sql = getDb()
  const rows = await sql`
    SELECT * FROM news WHERE id = ${id} LIMIT 1
  `
  return rows.length > 0 ? toNewsItem(rows[0]) : null
}

export async function createNewsItem(
  data: Omit<NewsItem, "id" | "createdAt" | "updatedAt">,
): Promise<NewsItem> {
  await ensureTable()
  const sql = getDb()
  const rows = await sql`
    INSERT INTO news (title, content, cover_image, published)
    VALUES (${data.title}, ${data.content}, ${data.coverImage}, ${data.published})
    RETURNING *
  `
  return toNewsItem(rows[0])
}

export async function updateNewsItem(
  id: number,
  data: Partial<Omit<NewsItem, "id" | "createdAt">>,
): Promise<NewsItem | null> {
  await ensureTable()
  const sql = getDb()
  const rows = await sql`
    UPDATE news SET
      title       = COALESCE(${data.title ?? null}, title),
      content     = COALESCE(${data.content ?? null}, content),
      cover_image = ${data.coverImage !== undefined ? data.coverImage : sql`cover_image`},
      published   = COALESCE(${data.published ?? null}, published),
      updated_at  = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return rows.length > 0 ? toNewsItem(rows[0]) : null
}

export async function deleteNewsItem(id: number): Promise<boolean> {
  await ensureTable()
  const sql = getDb()
  const rows = await sql`
    DELETE FROM news WHERE id = ${id} RETURNING id
  `
  return rows.length > 0
}
