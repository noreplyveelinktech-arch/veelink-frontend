import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Pencil, Plus, Power, Trash2 } from 'lucide-react'
import adminCourseApi from '../../api/adminCourseApi'
import ConfirmDeleteModal from '../../components/shared/ConfirmDeleteModal'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import StatusBadge from '../../components/shared/StatusBadge'
import { useToast } from '../../context/ToastContext'
import { formatCurrency, getErrorMessage, normaliseArray } from '../../utils/helpers'
import { usePageMeta } from '../../utils/pageMeta'

function CoursesListPage() {
  usePageMeta('Manage Courses')
  const navigate = useNavigate()
  const { success, error } = useToast()
  const [courses, setCourses] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)

  const fetchCourses = async () => {
    const response = await adminCourseApi.getCourses()
    setCourses(normaliseArray(response))
  }

  useEffect(() => {
    const load = async () => {
      try {
        await fetchCourses()
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const handleDelete = async () => {
    if (!selected) return
    setBusy(true)
    try {
      await adminCourseApi.deleteCourse(selected.id)
      success('Course deleted successfully.')
      setSelected(null)
      await fetchCourses()
    } catch (deleteError) {
      error(getErrorMessage(deleteError, 'Unable to delete the course.'))
    } finally {
      setBusy(false)
    }
  }

  const toggleStatus = async (course) => {
    try {
      const nextStatus = course.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
      await adminCourseApi.updateStatus(course.id, nextStatus)
      success('Course status updated successfully.')
      await fetchCourses()
    } catch (statusError) {
      error(getErrorMessage(statusError, 'Unable to update course status.'))
    }
  }

  if (loading) return <LoadingSpinner label="Loading..." />

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Courses</h1>
          <p className="mt-2 text-slate-500">Manage all training programs and their visibility.</p>
        </div>
        <Link to="/admin/courses/add" className="btn-primary">
          <Plus className="h-5 w-5" />
          Add Course
        </Link>
      </div>

      <div className="overflow-hidden rounded-[32px] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Mode</th>
                <th className="px-6 py-4">Fee</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-t border-slate-100">
                  <td className="px-6 py-4 font-medium text-slate-900">{course.name}</td>
                  <td className="px-6 py-4 text-slate-600">{course.category || course.department || '—'}</td>
                  <td className="px-6 py-4 text-slate-600">{course.trainingMode || '—'}</td>
                  <td className="px-6 py-4 text-slate-600">{course.fee ? formatCurrency(course.fee) : '—'}</td>
                  <td className="px-6 py-4">
                    <StatusBadge value={course.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button type="button" className="btn-secondary px-4 py-2" onClick={() => navigate(`/admin/courses/edit/${course.id}`)}>
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button type="button" className="btn-secondary px-4 py-2" onClick={() => toggleStatus(course)}>
                        <Power className="h-4 w-4" />
                      </button>
                      <button type="button" className="btn-danger px-4 py-2" onClick={() => setSelected(course)}>
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

      <ConfirmDeleteModal
        open={Boolean(selected)}
        title="Delete course?"
        description="This action removes the selected course permanently."
        onCancel={() => setSelected(null)}
        onConfirm={handleDelete}
        loading={busy}
      />
    </div>
  )
}

export default CoursesListPage
