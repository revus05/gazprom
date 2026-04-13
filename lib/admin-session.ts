// Hardcoded admin credentials
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin"
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123"

const SESSION_SECRET =
  process.env.SESSION_SECRET ?? "gazprom-admin-secret-session-key-2024"

export const SESSION_COOKIE_NAME = "admin_session"
export const SESSION_MAX_AGE = 60 * 60 * 8 // 8 hours

// ──────────────────────────────────────────────
// Web Crypto helpers — работают и в Edge (middleware), и в Node.js
// ──────────────────────────────────────────────

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  )
}

function toBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

function fromBase64(str: string): ArrayBuffer {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/")
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)).buffer as ArrayBuffer
}

export interface SessionPayload {
  username: string
  iat: number
}

/** Создаёт подписанный токен для cookie */
export async function createSessionToken(username: string): Promise<string> {
  const payload: SessionPayload = { username, iat: Date.now() }
  const payloadB64 = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")

  const key = await importKey(SESSION_SECRET)
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payloadB64),
  )

  return `${payloadB64}.${toBase64(sig)}`
}

/** Верифицирует токен. Возвращает payload или null */
export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const dotIndex = token.lastIndexOf(".")
    if (dotIndex === -1) return null

    const payloadB64 = token.slice(0, dotIndex)
    const sigB64 = token.slice(dotIndex + 1)

    const key = await importKey(SESSION_SECRET)
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64(sigB64),
      new TextEncoder().encode(payloadB64),
    )

    if (!valid) return null

    const rawBase64 = payloadB64.replace(/-/g, "+").replace(/_/g, "/")
    const payload = JSON.parse(atob(rawBase64)) as SessionPayload
    return payload
  } catch {
    return null
  }
}
