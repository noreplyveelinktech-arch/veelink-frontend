import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import companyApi from '../api/companyApi'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import { socialLinksFromSettings } from '../utils/helpers'

const CompanyContext = createContext(null)

export function CompanyProvider({ children }) {
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await companyApi.getSettings()
        setCompany(response || {})
        setError(null)
      } catch (fetchError) {
        setCompany({})
        setError(fetchError)
      } finally {
        setLoading(false)
      }
    }

    fetchCompany()
  }, [])

  useEffect(() => {
    const faviconUrl = company?.faviconUrl

    if (!faviconUrl) return

    let favicon = document.querySelector("link[rel='icon']")
    if (!favicon) {
      favicon = document.createElement('link')
      favicon.rel = 'icon'
      document.head.appendChild(favicon)
    }

    favicon.href = faviconUrl
  }, [company])

  const value = useMemo(
    () => ({
      ...company,
      companyName: company?.companyName || '',
      logoUrl: company?.logoUrl || '',
      faviconUrl: company?.faviconUrl || '',
      tagline: company?.tagline || '',
      phone: company?.phone || '',
      whatsapp: company?.whatsapp || '',
      email: company?.email || '',
      address: company?.address || '',
      socials: socialLinksFromSettings(company),
      loading,
      error,
      refreshCompany: async () => {
        const response = await companyApi.getSettings()
        setCompany(response || {})
        return response
      },
    }),
    [company, error, loading],
  )

  if (loading) {
    return <LoadingSpinner fullScreen label="Loading..." />
  }

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
}

export const useCompany = () => {
  const context = useContext(CompanyContext)

  if (!context) {
    throw new Error('useCompany must be used within CompanyProvider')
  }

  return context
}
