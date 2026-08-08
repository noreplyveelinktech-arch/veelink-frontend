import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useCompany } from '../../context/CompanyContext'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Courses', to: '/courses' },
  { label: 'Enquiry', to: '/enquiry' },
  { label: 'Contact', to: '/contact' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { companyName, logoUrl, tagline } = useCompany()

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          {logoUrl ? (
            <img src={logoUrl} alt={companyName || 'Loading...'} className="h-12 w-12 rounded-2xl object-cover shadow-lg" />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-sky-500 text-lg font-bold text-white">
              {companyName?.charAt(0) || '...'}
            </div>
          )}
          <div>
            <p className="text-lg font-bold text-slate-950">{companyName || 'Loading...'}</p>
            <p className="text-xs text-slate-500">{tagline || 'Loading...'}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/enquiry" className="btn-primary">
            Enquiry Now
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex rounded-2xl border border-slate-200 p-3 text-slate-700 lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="container-shell flex flex-col gap-3 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-medium ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'bg-slate-50 text-slate-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/enquiry" className="btn-primary" onClick={() => setIsOpen(false)}>
              Enquiry Now
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Navbar
