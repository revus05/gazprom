"use server"

import { revalidatePath } from "next/cache"
import { SubmissionStatus } from "@/lib/submission-constants"
import { updateSubmissionStatus } from "@/lib/submissions"

export async function updateStatusAction(
  id: number,
  status: SubmissionStatus,
): Promise<void> {
  await updateSubmissionStatus(id, status)
  revalidatePath("/admin/submissions")
  revalidatePath("/admin")
}
