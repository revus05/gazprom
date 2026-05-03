import type { ContactFormData } from "@/lib/schemas/contact-form"
import type { SubmissionStatus } from "@/lib/submission-constants"
import { getDb, ensureTable } from "@/lib/db"

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

export async function readSubmissions(): Promise<Submission[]> {
  await ensureTable()
  const sql = getDb()
  const rows = await sql<Array<{
    id: number
    created_at: Date
    status: string
    contractor_type: string
    organization_name: string
    unp: string
    contact_name: string
    contact_position: string
    email: string
    request_type: string
    message: string
  }>>`
    SELECT * FROM submissions
    ORDER BY created_at DESC
  `

  return rows.map((row) => ({
    id: row.id,
    createdAt: row.created_at.toISOString(),
    status: row.status as SubmissionStatus,
    contractorType: row.contractor_type as ContactFormData["contractorType"],
    organizationName: row.organization_name,
    unp: row.unp,
    contactName: row.contact_name,
    contactPosition: row.contact_position,
    email: row.email,
    requestType: row.request_type as ContactFormData["requestType"],
    message: row.message,
  }))
}

export async function addSubmission(data: ContactFormData): Promise<Submission> {
  await ensureTable()
  const sql = getDb()

  const [row] = await sql<Array<{
    id: number
    created_at: Date
    status: string
    contractor_type: string
    organization_name: string
    unp: string
    contact_name: string
    contact_position: string
    email: string
    request_type: string
    message: string
  }>>`
    INSERT INTO submissions (
      contractor_type,
      organization_name,
      unp,
      contact_name,
      contact_position,
      email,
      request_type,
      message
    ) VALUES (
      ${data.contractorType},
      ${data.organizationName},
      ${data.unp},
      ${data.contactName},
      ${data.contactPosition},
      ${data.email},
      ${data.requestType},
      ${data.message}
    )
    RETURNING *
  `

  return {
    id: row.id,
    createdAt: row.created_at.toISOString(),
    status: row.status as SubmissionStatus,
    contractorType: row.contractor_type as ContactFormData["contractorType"],
    organizationName: row.organization_name,
    unp: row.unp,
    contactName: row.contact_name,
    contactPosition: row.contact_position,
    email: row.email,
    requestType: row.request_type as ContactFormData["requestType"],
    message: row.message,
  }
}

export async function updateSubmissionStatus(
  id: number,
  status: SubmissionStatus
): Promise<void> {
  await ensureTable()
  const sql = getDb()
  await sql`
    UPDATE submissions
    SET status = ${status}
    WHERE id = ${id}
  `
}
