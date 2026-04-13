export type SubmissionStatus = "new" | "in_progress" | "done" | "rejected";

export const STATUS_LABELS: Record<SubmissionStatus, string> = {
  new: "Новая",
  in_progress: "В работе",
  done: "Выполнена",
  rejected: "Отклонена",
};

export const STATUS_STYLES: Record<SubmissionStatus, string> = {
  new: "bg-blue-50   text-blue-900",
  in_progress: "bg-yellow-50 text-yellow-900",
  done: "bg-green-50  text-green-900",
  rejected: "bg-red-50    text-red-900",
};
