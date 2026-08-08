import { useEffect, useMemo, useState } from 'react'
import coursesApi from '../../api/coursesApi'
import enquiryApi from '../../api/enquiryApi'
import { useToast } from '../../context/ToastContext'
import { getErrorMessage, getFieldErrors, normaliseArray } from '../../utils/helpers'
import FormField from '../shared/FormField'

const defaultForm = {
  fullName: '',
  email: '',
  mobileNumber: '',
  courseId: '',
  message: '',
}

function EnquiryForm({ preselectedCourseId = '' }) {
  const { success, error: showError } = useToast()
  const [formData, setFormData] = useState(defaultForm)
  const [errors, setErrors] = useState({})
  const [courses, setCourses] = useState([])
  const [loadingCourses, setLoadingCourses] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await coursesApi.getCourses()
        const items = normaliseArray(response).filter((course) => !course.status || course.status === 'ACTIVE')
        setCourses(items)
      } finally {
        setLoadingCourses(false)
      }
    }

    fetchCourses()
  }, [])

  useEffect(() => {
    if (!preselectedCourseId || !courses.length) return
    setFormData((current) => ({ ...current, courseId: String(preselectedCourseId) }))
  }, [courses, preselectedCourseId])

  const courseOptions = useMemo(
    () => [
      { label: loadingCourses ? 'Loading...' : '-- Select Interested Course --', value: '' },
      ...courses.map((course) => ({ label: course.name, value: String(course.id) })),
    ],
    [courses, loadingCourses],
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!formData.email.trim()) nextErrors.email = 'Email is required.'
    if (!formData.mobileNumber.trim()) nextErrors.mobileNumber = 'Mobile number is required.'
    if (!formData.courseId) nextErrors.courseId = 'Please select an interested course.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validate()) return

    setSubmitting(true)
    try {
      await enquiryApi.createEnquiry({
        fullName: formData.fullName,
        email: formData.email,
        mobileNumber: formData.mobileNumber,
        courseId: formData.courseId,
        message: formData.message,
      })
      success('Thank you for your enquiry. Our team will contact you shortly.')
      setFormData(defaultForm)
      setErrors({})
    } catch (submitError) {
      setErrors(getFieldErrors(submitError))
      showError(getErrorMessage(submitError, 'Unable to submit the enquiry.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="card-surface p-6 sm:p-8" onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <FormField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} error={errors.fullName} required />
        <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
        <FormField label="Mobile Number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} error={errors.mobileNumber} required />
        <FormField
          label="Interested Course"
          name="courseId"
          as="select"
          value={formData.courseId}
          onChange={handleChange}
          error={errors.courseId}
          options={courseOptions}
          required
        />
        <div className="md:col-span-2">
          <FormField label="Message" name="message" as="textarea" rows={5} value={formData.message} onChange={handleChange} error={errors.message} />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Enquiry'}
        </button>
      </div>
    </form>
  )
}

export default EnquiryForm
