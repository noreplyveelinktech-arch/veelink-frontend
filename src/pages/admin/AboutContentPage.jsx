import { useEffect, useState } from 'react'
import adminAboutApi from '../../api/adminAboutApi'
import AdminAboutContentForm from '../../components/admin/AdminAboutContentForm'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import { useToast } from '../../context/ToastContext'
import { getErrorMessage } from '../../utils/helpers'
import { usePageMeta } from '../../utils/pageMeta'

const defaultValues = {
  pageTitle: '',
  subtitle: '',
  description: '',
  mission: '',
  vision: '',
  imageUrl: '',
  valuesTitle: '',
}

function AboutContentPage() {
  usePageMeta('About Content')
  const { success, error } = useToast()
  const [values, setValues] = useState(defaultValues)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminAboutApi.getContent()
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
      await adminAboutApi.updateContent(payload)
      success('About content updated successfully.')
    } catch (saveError) {
      error(getErrorMessage(saveError, 'Unable to save about content.'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSpinner label="Loading..." />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-950">About Content</h1>
        <p className="mt-2 text-slate-500">Edit the about page narrative, mission, and vision.</p>
      </div>
      <AdminAboutContentForm initialValues={values} onSubmit={handleSubmit} saving={saving} />
    </div>
  )
}

export default AboutContentPage
