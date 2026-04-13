// Admin-раздел полностью изолирован от основного сайта (нет Header / Footer)
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-background">{children}</div>
}
