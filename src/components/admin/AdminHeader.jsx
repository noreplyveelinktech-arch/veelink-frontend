import { Menu } from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'

function AdminHeader({ onMenuClick }) {
  const { user } = useAdminAuth()

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button type="button" className="rounded-2xl border border-slate-200 p-3 lg:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden lg:block">
          <p className="text-sm text-slate-500">Manage content, courses, enquiries, and team updates.</p>
        </div>
        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-right">
          <p className="text-sm font-semibold text-slate-950">{user?.name || 'Loading...'}</p>
          <p className="text-xs text-slate-500">{user?.email || 'Loading...'}</p>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
