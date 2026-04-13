"use server";

import { buildEmailHtml, createTransporter } from "@/lib/email";
import { contactFormSchema } from "@/lib/schemas/contact-form";
import { addSubmission } from "@/lib/submissions";

export async function sendContactEmail(data: unknown) {
  const parsed = contactFormSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Проверьте правильность заполнения формы" };
  }

  // Всегда сохраняем заявку — независимо от результата отправки письма
  addSubmission(parsed.data);

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Газпром Трансгаз Беларусь" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      subject: `Новое обращение: ${parsed.data.organizationName}`,
      html: buildEmailHtml(parsed.data),
    });
  } catch {
    // Письмо не отправилось, но заявка уже сохранена
  }

  return { success: true };
}
