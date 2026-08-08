import { useEffect, useMemo, useState } from 'react'
import { Mail, RefreshCcw, Trash2 } from 'lucide-react'
import adminEnquiryApi from '../../api/adminEnquiryApi'
import adminCourseApi from '../../api/adminCourseApi'
import ConfirmDeleteModal from '../../components/shared/ConfirmDeleteModal'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import StatusBadge from '../../components/shared/StatusBadge'
import { useToast } from '../../context/ToastContext'
import { formatDate, getErrorMessage, normaliseArray } from '../../utils/helpers'
import { usePageMeta } from '../../utils/pageMeta'

function EnquiriesPage() {
  usePageMeta('Manage Enquiries')
  const { success, error } = useToast()
  const [enquiries, setEnquiries] = useState([])
  const [courses, setCourses] = useState([])
  const [statusFilter, setStatusFilter] = useState('all')
  const [courseFilter, setCourseFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)

  const loadData = async () => {
    const [enquiryResponse, courseResponse] = await Promise.all([adminEnquiryApi.getEnquiries(), adminCourseApi.getCourses()])
    setEnquiries(normaliseArray(enquiryResponse))
    setCourses(normaliseArray(courseResponse))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadData()
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredEnquiries = useMemo(
    () =>
      enquiries.filter((item) => {
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter
        const matchesCourse = courseFilter === 'all' || String(item.courseId || item.interestedCourseId) === courseFilter
        return matchesStatus && matchesCourse
      }),
    [courseFilter, enquiries, statusFilter],
  )

  const handleStatusChange = async (id, status) => {
    try {
      await adminEnquiryApi.updateStatus(id, status)
      success('Enquiry status updated successfully.')
      await loadData()
    } catch (statusError) {
      error(getErrorMessage(statusError, 'Unable to update enquiry status.'))
    }
  }

  const handleDelete = async () => {
    if (!selected) return
    setBusy(true)
    try {
      await adminEnquiryApi.deleteEnquiry(selected.id)
      success('Enquiry deleted successfully.')
      setSelected(null)
      await loadData()
    } catch (deleteError) {
      error(getErrorMessage(deleteError, 'Unable to delete enquiry.'))
    } finally {
      setBusy(false)
    }
  }

  const handleResend = async (id) => {
    try {
      await adminEnquiryApi.resendEmail(id)
      success('Email resend triggered successfully.')
      await loadData()
    } catch (resendError) {
      error(getErrorMessage(resendError, 'Unable to resend email.'))
    }
  }

  const openDetails = async (id) => {
    try {
      const response = await adminEnquiryApi.getEnquiryById(id)
      setDetails(response || null)
    } catch (detailsError) {
      error(getErrorMessage(detailsError, 'Unable to load enquiry details.'))
    }
  }

  if (loading) return <LoadingSpinner label="Loading..." />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-950">Enquiries</h1>
        <p className="mt-2 text-slate-500">Review enquiries, update statuses, and retry failed emails.</p>
      </div>

      <div className="grid gap-4 rounded-[28px] bg-white p-5 shadow-sm md:grid-cols-2 xl:grid-cols-4">
        <select className="input-field" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="all">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="CONTACTED">Contacted</option>
          <option value="CLOSED">Closed</option>
        </select>
        <select className="input-field" value={courseFilter} onChange={(event) => setCourseFilter(event.target.value)}>
          <option value="all">All Courses</option>
          {courses.map((course) => (
            <option key={course.id} value={String(course.id)}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-[32px] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Mobile</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Email Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquiries.map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.fullName}</td>
                  <td className="px-6 py-4 text-slate-600">{item.email}</td>
                  <td className="px-6 py-4 text-slate-600">{item.mobileNumber}</td>
                  <td className="px-6 py-4 text-slate-600">{item.courseName || item.interestedCourseName || '—'}</td>
                  <td className="px-6 py-4">
                    <select className="input-field py-2" value={item.status || 'PENDING'} onChange={(event) => handleStatusChange(item.id, event.target.value)}>
                      <option value="PENDING">Pending</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge value={item.emailStatus || 'PENDING'} />
                  </td>
                  <td className="px-6 py-4 text-slate-500">{formatDate(item.createdAt)}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button type="button" className="btn-secondary px-4 py-2" onClick={() => openDetails(item.id)}>
                        <Mail className="h-4 w-4" />
                      </button>
                      {item.emailStatus === 'FAILED' ? (
                        <button type="button" className="btn-secondary px-4 py-2" onClick={() => handleResend(item.id)}>
                          <RefreshCcw className="h-4 w-4" />
                        </button>
                      ) : null}
                      <button type="button" className="btn-danger px-4 py-2" onClick={() => setSelected(item)}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {details ? (
        <div className="rounded-[32px] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-950">Enquiry Details</h2>
            <button type="button" className="text-sm font-semibold text-slate-500" onClick={() => setDetails(null)}>
              Close
            </button>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-slate-500">Name</p>
              <p className="mt-1 text-slate-800">{details.fullName}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Email</p>
              <p className="mt-1 text-slate-800">{details.email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Mobile</p>
              <p className="mt-1 text-slate-800">{details.mobileNumber}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Course</p>
              <p className="mt-1 text-slate-800">{details.courseName || details.interestedCourseName || '—'}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-slate-500">Message</p>
              <p className="mt-1 whitespace-pre-line text-slate-800">{details.message || '—'}</p>
            </div>
          </div>
        </div>
      ) : null}

      <ConfirmDeleteModal
        open={Boolean(selected)}
        title="Delete enquiry?"
        description="This action removes the selected enquiry permanently."
        onCancel={() => setSelected(null)}
        onConfirm={handleDelete}
        loading={busy}
      />
    </div>
  )
}

export default EnquiriesPage
