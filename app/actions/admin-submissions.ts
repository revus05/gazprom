"use server"

import { revalidatePath } from "next/cache"
import { updateSubmissionStatus, type SubmissionStatus } from "@/lib/submissions"

export async function updateStatusAction(
  id: number,
  status: SubmissionStatus,
): Promise<void> {
  updateSubmissionStatus(id, status)
  revalidatePath("/admin/submissions")
  revalidatePath("/admin")
}
