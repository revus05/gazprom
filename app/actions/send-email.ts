"use server"

import { contactFormSchema } from "@/lib/schemas/contact-form"
import { buildEmailHtml, createTransporter } from "@/lib/email"

export async function sendContactEmail(data: unknown) {
  const parsed = contactFormSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: "Проверьте правильность заполнения формы" }
  }

  try {
    const transporter = createTransporter()
    await transporter.sendMail({
      from: `"Газпром Трансгаз Беларусь" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      subject: `Новое обращение: ${parsed.data.organizationName}`,
      html: buildEmailHtml(parsed.data),
    })
    return { success: true }
  } catch {
    return { success: false, error: "Ошибка отправки. Попробуйте позже." }
  }
}
