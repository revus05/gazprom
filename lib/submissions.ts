import fs from "node:fs"
import path from "node:path"
import type { ContactFormData } from "@/lib/schemas/contact-form"
import type { SubmissionStatus } from "@/lib/submission-constants"

export type { SubmissionStatus } from "@/lib/submission-constants"
export { STATUS_LABELS, STATUS_STYLES } from "@/lib/submission-constants"

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "submissions.json")

export interface Submission {
  id: number
  createdAt: string
  status: SubmissionStatus
  contractorType: ContactFormData["contractorType"]
  organizationName: string
  unp: string
  contactName: string
  contactPosition: string
  email: string
  requestType: ContactFormData["requestType"]
  message: string
}

function ensureFile(): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8")
}

export function readSubmissions(): Submission[] {
  try {
    ensureFile()
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as Submission[]
  } catch {
    return []
  }
}

export function addSubmission(data: ContactFormData): Submission {
  const all = readSubmissions()
  const maxId = all.length > 0 ? Math.max(...all.map((s) => s.id)) : 1000
  const submission: Submission = {
    ...data,
    id: maxId + 1,
    createdAt: new Date().toISOString(),
    status: "new",
  }
  all.unshift(submission)
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), "utf-8")
  return submission
}

export function updateSubmissionStatus(
  id: number,
  status: SubmissionStatus,
): void {
  const all = readSubmissions()
  const idx = all.findIndex((s) => s.id === id)
  if (idx !== -1) {
    all[idx].status = status
    fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), "utf-8")
  }
}
