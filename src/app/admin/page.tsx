import { notFound } from 'next/navigation'
import { isAdminEnabled } from '@/lib/features'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  if (!isAdminEnabled()) notFound()
  const { default: AdminDashboard } = await import('@/components/admin/AdminDashboard')
  return <AdminDashboard />
}
