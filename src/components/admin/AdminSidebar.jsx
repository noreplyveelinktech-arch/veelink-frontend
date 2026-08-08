import { NavLink, useNavigate } from 'react-router-dom'
import { Building2, ClipboardList, Home, Info, LayoutDashboard, LogOut, MenuSquare, Users, X } from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { useCompany } from '../../context/CompanyContext'

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/company-settings', label: 'Company Settings', icon: Building2 },
  { to: '/admin/home-content', label: 'Home Content', icon: Home },
  { to: '/admin/about-content', label: 'About Content', icon: Info },
  { to: '/admin/courses', label: 'Courses', icon: MenuSquare },
  { to: '/admin/enquiries', label: 'Enquiries', icon: ClipboardList },
  { to: '/admin/team', label: 'Team', icon: Users },
  { to: '/admin/users', label: 'Users', icon: Users },
]

function AdminSidebar({ open, onClose }) {
  const navigate = useNavigate()
  const { logout } = useAdminAuth()
  const { companyName } = useCompany()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <>
      {open ? <button type="button" className="fixed inset-0 z-30 bg-slate-950/50 lg:hidden" onClick={onClose} /> : null}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-slate-950 px-5 py-6 text-slate-200 transition lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-white">{companyName || 'Loading...'}</p>
            <p className="text-sm text-slate-400">Admin Panel</p>
          </div>
          <button type="button" className="rounded-xl border border-white/10 p-2 lg:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 grid gap-2">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-white text-slate-950' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </NavLink>
            )
          })}
        </nav>

        <button type="button" onClick={handleLogout} className="mt-8 flex w-full items-center gap-3 rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </aside>
    </>
  )
}

export default AdminSidebar
