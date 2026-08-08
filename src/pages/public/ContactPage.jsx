import { useEffect, useState } from 'react'
import contactApi from '../../api/contactApi'
import ContactSection from '../../components/public/ContactSection'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import { useCompany } from '../../context/CompanyContext'
import { socialLinksFromSettings } from '../../utils/helpers'
import { usePageMeta } from '../../utils/pageMeta'

function ContactPage() {
  usePageMeta('Contact')
  const company = useCompany()
  const [contact, setContact] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await contactApi.getContactDetails()
        setContact(response || {})
      } finally {
        setLoading(false)
      }
    }

    fetchContact()
  }, [])

  if (loading) return <LoadingSpinner label="Loading..." />

  return <ContactSection contact={{ ...company, ...contact }} socials={socialLinksFromSettings({ ...company, ...contact })} />
}

export default ContactPage
