import nodemailer from "nodemailer"
import type { ContactFormData } from "./schemas/contact-form"
import { contractorTypeLabels, requestTypeLabels } from "./schemas/contact-form"

export function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_FROM,
      pass: process.env.SMTP_PASS,
    },
  })
}

export function buildEmailHtml(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta charset="UTF-8" />
      <style>
        body { font-family: Arial, sans-serif; color: #1a1a1a; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 32px 24px; }
        .header { background: #0055A5; color: white; padding: 24px; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 20px; }
        .body { background: #f9f9f9; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 16px; }
        .label { font-size: 12px; font-weight: 600; text-transform: uppercase; color: #6b7280; margin-bottom: 4px; }
        .value { font-size: 15px; color: #111827; background: white; padding: 10px 14px; border-radius: 6px; border: 1px solid #e5e7eb; }
        .message-value { white-space: pre-wrap; }
        .footer { margin-top: 24px; font-size: 12px; color: #9ca3af; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Новое обращение через сайт</h1>
          <p style="margin:8px 0 0;opacity:0.85;font-size:14px;">Газпром Трансгаз Беларусь</p>
        </div>
        <div class="body">
          <div class="field">
            <div class="label">Тип контрагента</div>
            <div class="value">${contractorTypeLabels[data.contractorType]}</div>
          </div>
          <div class="field">
            <div class="label">Полное наименование организации</div>
            <div class="value">${data.organizationName}</div>
          </div>
          <div class="field">
            <div class="label">УНП</div>
            <div class="value">${data.unp}</div>
          </div>
          <div class="field">
            <div class="label">Контактное лицо</div>
            <div class="value">${data.contactName} — ${data.contactPosition}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          <div class="field">
            <div class="label">Характер обращения</div>
            <div class="value">${requestTypeLabels[data.requestType]}</div>
          </div>
          <div class="field">
            <div class="label">Описание</div>
            <div class="value message-value">${data.message}</div>
          </div>
        </div>
        <div class="footer">Письмо сформировано автоматически. Не отвечайте на это сообщение.</div>
      </div>
    </body>
    </html>
  `
}
