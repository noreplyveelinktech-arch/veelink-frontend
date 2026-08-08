import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react'
import { useCompany } from '../../context/CompanyContext'

const socialIconMap = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  twitter: Twitter,
}

function Footer() {
  const { companyName, tagline, address, email, phone, socials } = useCompany()

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="container-shell grid gap-10 py-12 lg:grid-cols-[1.2fr,0.8fr,1fr]">
        <div>
          <p className="text-2xl font-bold text-white">{companyName || 'Loading...'}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">{tagline || 'Loading...'}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socials.map((social) => {
              const Icon = socialIconMap[social.platform] || Linkedin
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-brand-500"
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold text-white">Quick Links</p>
          <div className="mt-5 grid gap-3 text-sm text-slate-400">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/enquiry">Enquiry</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold text-white">Contact Info</p>
          <div className="mt-5 space-y-4 text-sm text-slate-400">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
              <span>{address || 'Loading...'}</span>
            </p>
            <a href={email ? `mailto:${email}` : undefined} className="flex gap-3">
              <Mail className="h-5 w-5 shrink-0 text-brand-400" />
              <span>{email || 'Loading...'}</span>
            </a>
            <a href={phone ? `tel:${phone}` : undefined} className="flex gap-3">
              <Phone className="h-5 w-5 shrink-0 text-brand-400" />
              <span>{phone || 'Loading...'}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {companyName || 'Loading...'}. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
