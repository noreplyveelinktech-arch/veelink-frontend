import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react'
import SectionHeading from '../shared/SectionHeading'

const icons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  twitter: Twitter,
}

function ContactSection({ contact = {}, socials = [] }) {
  const mapUrl = contact.googleMapsUrl || ''
  const isEmbedUrl = mapUrl.includes('google.com/maps/embed')

  return (
    <section className="section-padding">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="card-surface p-8">
          <SectionHeading eyebrow="Contact" title={contact.title || 'Get in touch'} description={contact.subtitle || 'Reach out for course guidance and enrollment support.'} />
          <div className="mt-8 space-y-5 text-sm leading-7 text-slate-600">
            <p className="flex gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-500" />
              <span>{contact.address || 'Loading...'}</span>
            </p>
            <a href={contact.phone ? `tel:${contact.phone}` : undefined} className="flex gap-3">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-brand-500" />
              <span>{contact.phone || 'Loading...'}</span>
            </a>
            <a href={contact.email ? `mailto:${contact.email}` : undefined} className="flex gap-3">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-brand-500" />
              <span>{contact.email || 'Loading...'}</span>
            </a>
            {contact.whatsapp ? (
              <a href={`https://wa.me/${String(contact.whatsapp).replace(/[^\d]/g, '')}`} target="_blank" rel="noreferrer" className="flex gap-3">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-brand-500" />
                <span>{contact.whatsapp}</span>
              </a>
            ) : null}
            {contact.workingHours ? <p className="rounded-2xl bg-slate-50 p-4">{contact.workingHours}</p> : null}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {socials.map((social) => {
              const Icon = icons[social.platform] || Linkedin
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition hover:bg-brand-500 hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>
        </div>

        <div className="card-surface overflow-hidden p-3">
          {isEmbedUrl ? (
            <iframe
              src={mapUrl}
              title="Google Maps"
              className="min-h-[420px] w-full rounded-[24px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 rounded-[24px] bg-slate-100 p-8 text-center">
              <p className="text-slate-500">Map preview is unavailable.</p>
              {mapUrl ? (
                <a href={mapUrl} target="_blank" rel="noreferrer" className="btn-primary">
                  View on Google Maps
                </a>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactSection
