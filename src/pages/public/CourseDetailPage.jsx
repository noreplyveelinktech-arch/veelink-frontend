import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Clock3, Landmark, Laptop, Wallet } from 'lucide-react'
import coursesApi from '../../api/coursesApi'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import { formatCurrency } from '../../utils/helpers'
import { usePageMeta } from '../../utils/pageMeta'

function CourseDetailPage() {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  usePageMeta(course?.name || 'Course Detail')

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await coursesApi.getCourseById(id)
        setCourse(response || null)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [id])

  if (loading) return <LoadingSpinner label="Loading..." />

  return (
    <div className="section-padding">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-8">
            <div className="card-surface overflow-hidden p-3">
              {course?.imageUrl ? (
                <img src={course.imageUrl} alt={course.name} className="max-h-[460px] w-full rounded-[24px] object-cover" />
              ) : (
                <div className="flex min-h-[420px] items-center justify-center rounded-[24px] bg-gradient-to-br from-brand-50 to-sky-50 text-slate-400">No Image</div>
              )}
            </div>
            <div className="card-surface p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600">{course?.category || course?.department || 'Course'}</p>
              <h1 className="mt-4 text-4xl font-black text-slate-950">{course?.name || 'Course'}</h1>
              <p className="mt-6 text-base leading-8 text-slate-600">{course?.description || 'No description available.'}</p>
            </div>
          </div>

          <aside className="card-surface h-fit p-8">
            <h2 className="text-2xl font-bold text-slate-950">Course Snapshot</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <p className="flex gap-3">
                <Clock3 className="h-5 w-5 text-brand-500" />
                <span>{course?.duration || '—'}</span>
              </p>
              <p className="flex gap-3">
                <Laptop className="h-5 w-5 text-brand-500" />
                <span>{course?.trainingMode || '—'}</span>
              </p>
              <p className="flex gap-3">
                <Landmark className="h-5 w-5 text-brand-500" />
                <span>{course?.department || course?.category || '—'}</span>
              </p>
              {course?.fee ? (
                <p className="flex gap-3">
                  <Wallet className="h-5 w-5 text-brand-500" />
                  <span>{formatCurrency(course.fee)}</span>
                </p>
              ) : null}
            </div>

            <div className="mt-8 rounded-3xl bg-slate-50 p-5 text-sm leading-7 text-slate-600">
              Need help choosing the right training path? Share your goals and get a callback from our counselling team.
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link to={`/enquiry?courseId=${course?.id}`} className="btn-primary">
                Enquire Now
              </Link>
              <Link to="/courses" className="btn-secondary">
                Back to Courses
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailPage
