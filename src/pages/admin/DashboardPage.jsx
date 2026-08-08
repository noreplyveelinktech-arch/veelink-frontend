import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import dashboardApi from '../../api/dashboardApi'
import AdminStatsCard from '../../components/admin/AdminStatsCard'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import { formatDate, normaliseArray } from '../../utils/helpers'
import { usePageMeta } from '../../utils/pageMeta'

function DashboardPage() {
  usePageMeta('Admin Dashboard')
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardApi.getStats()
        setStats(response || {})
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) return <LoadingSpinner label="Loading..." />

  const recentEnquiries = normaliseArray(stats?.recentEnquiries)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-950">Dashboard</h1>
        <p className="mt-2 text-slate-500">Quick summary of courses, enquiries, and email delivery.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatsCard title="Total Courses" value={stats?.totalCourses ?? 0} />
        <AdminStatsCard title="Active Courses" value={stats?.activeCourses ?? 0} />
        <AdminStatsCard title="Total Enquiries" value={stats?.totalEnquiries ?? 0} />
        <AdminStatsCard title="Email Sent / Failed" value={`${stats?.emailSentCount ?? 0} / ${stats?.emailFailedCount ?? 0}`} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-[32px] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-950">Recent Enquiries</h2>
            <Link to="/admin/enquiries" className="text-sm font-semibold text-brand-600">
              View All
            </Link>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Course</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="py-4 font-medium text-slate-800">{item.fullName}</td>
                    <td className="py-4 text-slate-600">{item.courseName || item.interestedCourseName || '—'}</td>
                    <td className="py-4 text-slate-500">{formatDate(item.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Quick Actions</h2>
          <div className="mt-6 grid gap-4">
            <Link to="/admin/courses/add" className="btn-primary">
              Add Course
            </Link>
            <Link to="/admin/enquiries" className="btn-secondary">
              View Enquiries
            </Link>
            <Link to="/admin/company-settings" className="btn-secondary">
              Company Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
