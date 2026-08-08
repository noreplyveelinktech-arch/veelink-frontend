import { useEffect, useMemo, useState } from 'react'
import coursesApi from '../../api/coursesApi'
import CourseCard from '../../components/public/CourseCard'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import SectionHeading from '../../components/shared/SectionHeading'
import { normaliseArray } from '../../utils/helpers'
import { usePageMeta } from '../../utils/pageMeta'

function CoursesPage() {
  usePageMeta('Courses')
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await coursesApi.getCourses()
        setCourses(normaliseArray(response))
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const categories = useMemo(() => {
    const unique = Array.from(new Set(courses.map((course) => course.category || course.department).filter(Boolean)))
    return ['all', ...unique]
  }, [courses])

  const filteredCourses = useMemo(
    () =>
      courses.filter((course) => {
        const matchesSearch = [course.name, course.category, course.department, course.description]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
        const matchesCategory = category === 'all' || (course.category || course.department) === category
        return matchesSearch && matchesCategory
      }),
    [category, courses, search],
  )

  if (loading) return <LoadingSpinner label="Loading..." />

  return (
    <div className="section-padding">
      <div className="container-shell">
        <SectionHeading eyebrow="Programs" title="Explore all courses" description="Find classroom and live online programs aligned with your career goals." />

        <div className="mt-8 grid gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1fr,240px]">
          <input
            type="search"
            placeholder="Search by course name, category or keyword"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="input-field"
          />
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="input-field">
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === 'all' ? 'All Categories' : item}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CoursesPage
