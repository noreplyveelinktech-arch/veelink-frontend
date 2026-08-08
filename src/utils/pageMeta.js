import { useEffect } from 'react'
import { useCompany } from '../context/CompanyContext'

const buildTitle = (pageTitle, companyName) => {
  if (pageTitle && companyName) return `${pageTitle} | ${companyName}`
  if (pageTitle) return pageTitle
  if (companyName) return companyName
  return 'Loading...'
}

export const usePageMeta = (pageTitle) => {
  const { companyName } = useCompany()

  useEffect(() => {
    document.title = buildTitle(pageTitle, companyName)
  }, [companyName, pageTitle])
}
