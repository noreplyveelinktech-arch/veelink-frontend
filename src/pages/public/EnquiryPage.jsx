import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import EnquiryForm from '../../components/public/EnquiryForm'
import SectionHeading from '../../components/shared/SectionHeading'
import { usePageMeta } from '../../utils/pageMeta'

function EnquiryPage() {
  usePageMeta('Enquiry')
  const [searchParams] = useSearchParams()
  const courseId = useMemo(() => searchParams.get('courseId') || '', [searchParams])

  return (
    <div className="section-padding">
      <div className="container-shell">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Enquiry"
            title="Take the next step with guided support"
            description="Tell us the program you are interested in and our team will help you with schedule, batch, and enrollment details."
            align="center"
          />
          <div className="mt-10">
            <EnquiryForm preselectedCourseId={courseId} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnquiryPage
