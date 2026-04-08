import { z } from "zod"

export const contactFormSchema = z.object({
  contractorType: z.enum(["legal", "individual", "foreign"] as const, {
    error: "Выберите тип контрагента",
  }),
  organizationName: z
    .string()
    .min(2, "Минимум 2 символа")
    .max(255, "Максимум 255 символов"),
  unp: z.string().regex(/^\d{9}$/, "УНП должен содержать ровно 9 цифр"),
  contactName: z.string().min(2, "Введите ФИО").max(100),
  contactPosition: z.string().min(2, "Введите должность").max(100),
  email: z.string().email("Введите корректный email"),
  requestType: z.enum(
    ["contract", "maintenance", "emergency", "metering", "general"] as const,
    { error: "Выберите характер обращения" }
  ),
  message: z
    .string()
    .min(10, "Минимум 10 символов")
    .max(1000, "Максимум 1000 символов"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const contractorTypeLabels: Record<
  ContactFormData["contractorType"],
  string
> = {
  legal: "Юридическое лицо",
  individual: "Индивидуальный предприниматель",
  foreign: "Иностранная организация",
}

export const requestTypeLabels: Record<ContactFormData["requestType"], string> =
  {
    contract: "Заключение договора",
    maintenance: "Техническое обслуживание",
    emergency: "Аварийная ситуация",
    metering: "Коммерческий учёт газа",
    general: "Общий вопрос",
  }
