import { useEffect, useState } from 'react'
import aboutApi from '../../api/aboutApi'
import teamApi from '../../api/teamApi'
import TeamCard from '../../components/public/TeamCard'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import SectionHeading from '../../components/shared/SectionHeading'
import { normaliseArray, sortByDisplayOrder } from '../../utils/helpers'
import { usePageMeta } from '../../utils/pageMeta'

function AboutPage() {
  usePageMeta('About Us')
  const [content, setContent] = useState({})
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutResponse, teamResponse] = await Promise.all([aboutApi.getContent(), teamApi.getMembers()])
        setContent(aboutResponse || {})
        setTeam(sortByDisplayOrder(normaliseArray(teamResponse).filter((member) => member.isActive !== false)))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <LoadingSpinner label="Loading..." />

  const values = normaliseArray(content.values || content.valueCards || [])

  return (
    <div className="section-padding">
      <div className="container-shell space-y-12">
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="About Us" title={content.pageTitle || 'About Us'} description={content.subtitle || content.description || 'Loading...'} />
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="card-surface p-6">
                <h3 className="text-xl font-bold text-slate-950">Mission</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{content.mission || 'Loading...'}</p>
              </div>
              <div className="card-surface p-6">
                <h3 className="text-xl font-bold text-slate-950">Vision</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{content.vision || 'Loading...'}</p>
              </div>
            </div>
          </div>
          <div className="card-surface overflow-hidden p-3">
            {content.imageUrl ? (
              <img src={content.imageUrl} alt={content.pageTitle || 'About'} className="max-h-[420px] w-full rounded-[24px] object-cover" />
            ) : (
              <div className="flex min-h-[420px] items-center justify-center rounded-[24px] bg-gradient-to-br from-brand-50 to-sky-50 text-slate-400">Loading...</div>
            )}
          </div>
        </section>

        {values.length ? (
          <section>
            <SectionHeading eyebrow="Core Values" title={content.valuesTitle || 'What guides our learning culture'} />
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {values.map((value) => (
                <div key={value.id || value.title} className="card-surface p-6">
                  <h3 className="text-xl font-bold text-slate-950">{value.title || 'Loading...'}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{value.description || 'Loading...'}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section>
          <SectionHeading eyebrow="Our Team" title={content.teamTitle || 'Meet the trainers and mentors'} />
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {team.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
