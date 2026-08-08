import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Sparkles } from 'lucide-react'
import homeApi from '../../api/homeApi'
import coursesApi from '../../api/coursesApi'
import HeroSection from '../../components/public/HeroSection'
import CourseCard from '../../components/public/CourseCard'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import SectionHeading from '../../components/shared/SectionHeading'
import { normaliseArray, sortByDisplayOrder } from '../../utils/helpers'
import { usePageMeta } from '../../utils/pageMeta'

const blockAnimation = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45 },
}

function HomePage() {
  usePageMeta('Home')
  const [homeContent, setHomeContent] = useState({})
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeResponse, coursesResponse] = await Promise.all([homeApi.getContent(), coursesApi.getCourses()])
        setHomeContent(homeResponse || {})
        setCourses(normaliseArray(coursesResponse).filter((course) => !course.status || course.status === 'ACTIVE'))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const popularCourses = useMemo(() => courses.slice(0, 6), [courses])
  const whyChooseUs = sortByDisplayOrder(homeContent.whyChooseUs || homeContent.whyChooseUsCards || [])
  const highlights = sortByDisplayOrder(homeContent.trainingHighlights || homeContent.highlights || [])

  if (loading) return <LoadingSpinner label="Loading..." />

  return (
    <div>
      <HeroSection content={homeContent} />

      <section className="section-padding">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Popular Courses"
            title={homeContent.popularCoursesTitle || 'Upskill with in-demand programs'}
            description={homeContent.popularCoursesDescription || 'Browse our most requested classroom and online training programs.'}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {popularCourses.map((course) => (
              <motion.div key={course.id} {...blockAnimation}>
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-shell grid gap-8 lg:grid-cols-2">
          <motion.div {...blockAnimation}>
            <SectionHeading
              eyebrow="Why Choose Us"
              title={homeContent.whyChooseUsTitle || 'Training designed for real outcomes'}
              description={homeContent.whyChooseUsDescription || 'Structured learning paths, industry mentors, and project-based delivery.'}
            />
            <div className="mt-8 grid gap-4">
              {whyChooseUs.map((item) => (
                <div key={item.id || item.title} className="card-surface p-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                      <BadgeCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950">{item.title || 'Loading...'}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.description || 'Loading...'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...blockAnimation}>
            <SectionHeading
              eyebrow="Training Highlights"
              title={homeContent.trainingHighlightsTitle || 'Practical support that accelerates learning'}
              description={homeContent.trainingHighlightsDescription || 'A premium blend of mentorship, labs, and placement readiness.'}
            />
            <div className="mt-8 grid gap-4">
              {highlights.map((item) => (
                <div key={item.id || item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950">{item.title || 'Loading...'}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.description || 'Loading...'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-shell">
          <motion.div
            {...blockAnimation}
            className="rounded-[32px] bg-gradient-to-r from-slate-950 via-brand-700 to-sky-500 px-8 py-10 text-white shadow-premium sm:px-10 lg:flex lg:items-center lg:justify-between"
          >
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.22em] text-white/70">Student Success</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                {homeContent.studentSuccessTitle || 'Placement-focused learning journeys'}
              </h2>
              <p className="mt-4 text-base leading-8 text-white/80">
                {homeContent.studentSuccessDescription ||
                  'Learners build projects, improve communication, and prepare for interviews with dedicated guidance.'}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 lg:mt-0">
              <Link to="/courses" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20">
                <BriefcaseBusiness className="h-5 w-5" />
                Browse Courses
              </Link>
              <Link to="/enquiry" className="btn-primary bg-white text-slate-950 hover:text-slate-950">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
