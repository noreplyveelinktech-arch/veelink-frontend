import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import adminCourseApi from '../../api/adminCourseApi'
import AdminCourseForm from '../../components/admin/AdminCourseForm'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import { useToast } from '../../context/ToastContext'
import { getErrorMessage } from '../../utils/helpers'
import { usePageMeta } from '../../utils/pageMeta'

const defaultValues = {
  name: '',
  department: '',
  categoryId: '',
  imageUrl: '',
  description: '',
  duration: '',
  trainingMode: '',
  fee: '',
  status: 'ACTIVE',
  displayOrder: 0,
}

function CourseFormPage({ mode }) {
  usePageMeta(mode === 'edit' ? 'Edit Course' : 'Add Course')
  const navigate = useNavigate()
  const { id } = useParams()
  const { success, error } = useToast()
  const [values, setValues] = useState(defaultValues)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(mode === 'edit')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    adminCourseApi.getCategories().then(setCategories).catch(() => setCategories([]))
  }, [])

  useEffect(() => {
    if (mode !== 'edit' || !id) return

    const fetchCourse = async () => {
      try {
        const response = await adminCourseApi.getCourseById(id)
        setValues({ ...defaultValues, ...(response || {}) })
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [id, mode])

  const handleSubmit = async (payload) => {
    setSaving(true)
    try {
      if (mode === 'edit') {
        await adminCourseApi.updateCourse(id, payload)
      } else {
        await adminCourseApi.createCourse(payload)
      }
      success(`Course ${mode === 'edit' ? 'updated' : 'created'} successfully.`)
      navigate('/admin/courses')
    } catch (saveError) {
      error(getErrorMessage(saveError, `Unable to ${mode === 'edit' ? 'update' : 'create'} the course.`))
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSpinner label="Loading..." />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-950">{mode === 'edit' ? 'Edit Course' : 'Add Course'}</h1>
        <p className="mt-2 text-slate-500">Create detailed training offerings with mode, fee, and status.</p>
      </div>
      <AdminCourseForm initialValues={values} categories={categories} onSubmit={handleSubmit} saving={saving} />
    </div>
  )
}

export default CourseFormPage
