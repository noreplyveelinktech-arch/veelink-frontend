import { useEffect, useState } from 'react'
import adminCompanyApi from '../../api/adminCompanyApi'
import AdminCompanySettingsForm from '../../components/admin/AdminCompanySettingsForm'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import { useCompany } from '../../context/CompanyContext'
import { useToast } from '../../context/ToastContext'
import { getErrorMessage } from '../../utils/helpers'
import { usePageMeta } from '../../utils/pageMeta'

const defaultValues = {
  companyName: '',
  logoUrl: '',
  faviconUrl: '',
  tagline: '',
  shortDescription: '',
  longDescription: '',
  email: '',
  phone: '',
  whatsapp: '',
  address: '',
  googleMapsUrl: '',
  workingHours: '',
  facebookUrl: '',
  instagramUrl: '',
  linkedinUrl: '',
  youtubeUrl: '',
  twitterUrl: '',
  enquiryNotificationEmail: '',
  primaryEmail: '',
  noreplyEmail: '',
  ccEmail: '',
  bccEmail: '',
  studentConfirmationEnabled: false,
  emailSenderName: '',
}

function CompanySettingsPage() {
  usePageMeta('Company Settings')
  const { success, error } = useToast()
  const { refreshCompany } = useCompany()
  const [values, setValues] = useState(defaultValues)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminCompanyApi.getSettings()
        setValues({ ...defaultValues, ...(response || {}) })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (payload) => {
    setSaving(true)
    try {
      await adminCompanyApi.updateSettings(payload)
      await refreshCompany()
      success('Company settings updated successfully.')
    } catch (saveError) {
      error(getErrorMessage(saveError, 'Unable to save company settings.'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSpinner label="Loading..." />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-950">Company Settings</h1>
        <p className="mt-2 text-slate-500">Update brand identity, contact details, and email preferences.</p>
      </div>
      <AdminCompanySettingsForm initialValues={values} onSubmit={handleSubmit} saving={saving} />
    </div>
  )
}

export default CompanySettingsPage
