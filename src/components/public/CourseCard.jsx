import { Link } from 'react-router-dom'
import { ArrowRight, Clock3, Landmark, Laptop, Wallet } from 'lucide-react'
import { excerptText, formatCurrency } from '../../utils/helpers'
import StatusBadge from '../shared/StatusBadge'

function CourseCard({ course }) {
  return (
    <div className="card-surface overflow-hidden">
      {course.imageUrl ? (
        <img src={course.imageUrl} alt={course.name} className="h-52 w-full object-cover" />
      ) : (
        <div className="flex h-52 items-center justify-center bg-gradient-to-br from-brand-50 to-sky-50 text-slate-400">No Image</div>
      )}
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">{course.category || course.department || 'Course'}</p>
            <h3 className="mt-2 text-xl font-bold text-slate-950">{course.name}</h3>
          </div>
          {course.status ? <StatusBadge value={course.status} /> : null}
        </div>

        <p className="text-sm leading-7 text-slate-600">{excerptText(course.description, 150) || 'No description available.'}</p>

        <div className="grid gap-3 text-sm text-slate-500 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-brand-500" />
            <span>{course.duration || '—'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Laptop className="h-4 w-4 text-brand-500" />
            <span>{course.trainingMode || '—'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Landmark className="h-4 w-4 text-brand-500" />
            <span>{course.department || course.category || '—'}</span>
          </div>
          {course.fee ? (
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-brand-500" />
              <span>{formatCurrency(course.fee)}</span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to={`/courses/${course.id}`} className="btn-secondary">
            View Details
          </Link>
          <Link to={`/enquiry?courseId=${course.id}`} className="btn-primary">
            Enquire Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
