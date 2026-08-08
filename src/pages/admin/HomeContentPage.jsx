import { useEffect, useState } from 'react'
import adminHomeApi from '../../api/adminHomeApi'
import AdminHomeContentForm from '../../components/admin/AdminHomeContentForm'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import { useToast } from '../../context/ToastContext'
import { createListItem, getErrorMessage, normaliseArray } from '../../utils/helpers'
import { usePageMeta } from '../../utils/pageMeta'

const defaultValues = {
  heroTitle: '',
  heroSubtitle: '',
  heroDescription: '',
  heroImageUrl: '',
  primaryButtonText: '',
  primaryButtonLink: '',
  secondaryButtonText: '',
  secondaryButtonLink: '',
  whyChooseUs: [createListItem({ order: 1 })],
  trainingHighlights: [createListItem({ order: 1 })],
}

function HomeContentPage() {
  usePageMeta('Home Content')
  const { success, error } = useToast()
  const [values, setValues] = useState(defaultValues)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminHomeApi.getContent()
        setValues({
          ...defaultValues,
          ...(response || {}),
          whyChooseUs: normaliseArray(response?.whyChooseUs).map((item, index) => ({ ...createListItem({ order: index + 1 }), ...item })),
          trainingHighlights: normaliseArray(response?.trainingHighlights).map((item, index) => ({ ...createListItem({ order: index + 1 }), ...item })),
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (payload) => {
    setSaving(true)
    try {
      await adminHomeApi.updateContent(payload)
      success('Home content updated successfully.')
    } catch (saveError) {
      error(getErrorMessage(saveError, 'Unable to save home content.'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSpinner label="Loading..." />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-950">Home Content</h1>
        <p className="mt-2 text-slate-500">Manage hero content and marketing highlights for the landing page.</p>
      </div>
      <AdminHomeContentForm initialValues={values} onSubmit={handleSubmit} saving={saving} />
    </div>
  )
}

export default HomeContentPage
