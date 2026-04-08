import { Geist_Mono, Roboto, Noto_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/ui/sonner"
import { cn } from "@/lib/utils"

const notoSansHeading = Noto_Sans({ subsets: ["latin"], variable: "--font-heading" })

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "Газпром Трансгаз Беларусь — Газовые услуги для бизнеса",
  description:
    "ООО «Газпром трансгаз Беларусь» — ведущий оператор газотранспортной системы. Транспортировка, обслуживание, учёт газа для корпоративных клиентов.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        roboto.variable,
        notoSansHeading.variable
      )}
    >
      <body>
        <ThemeProvider>
          <Header />
          <main className="pt-16 md:pt-18">{children}</main>
          <Footer />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
