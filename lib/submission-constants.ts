export type SubmissionStatus = "new" | "in_progress" | "done" | "rejected"

export const STATUS_LABELS: Record<SubmissionStatus, string> = {
  new: "Новая",
  in_progress: "В работе",
  done: "Выполнена",
  rejected: "Отклонена",
}

export const STATUS_STYLES: Record<SubmissionStatus, string> = {
  new: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  in_progress:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  done: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  rejected:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}
