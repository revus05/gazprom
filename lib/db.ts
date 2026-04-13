import postgres from "postgres"

let _sql: ReturnType<typeof postgres> | null = null

export function getDb() {
  if (_sql) return _sql
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set")
  }
  // max: 1 — оптимально для serverless, не держит пул открытых соединений
  _sql = postgres(process.env.DATABASE_URL, { max: 1 })
  return _sql
}

let tableReady = false

export async function ensureTable() {
  if (tableReady) return
  const sql = getDb()
  await sql`
    CREATE TABLE IF NOT EXISTS news (
      id          SERIAL PRIMARY KEY,
      title       TEXT        NOT NULL,
      content     TEXT        NOT NULL,
      cover_image TEXT,
      published   BOOLEAN     NOT NULL DEFAULT false,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  tableReady = true
}
