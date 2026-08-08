import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'

function HeroSection({ content = {} }) {
  return (
    <section className="overflow-hidden bg-hero-grid">
      <div className="container-shell section-padding grid items-center gap-12 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
          <span className="inline-flex rounded-full border border-brand-100 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
            {content.heroSubtitle || content.subtitle || 'Loading...'}
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {content.heroTitle || content.title || 'Loading...'}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            {content.heroDescription || content.description || 'Loading...'}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to={content.primaryButtonLink || '/courses'} className="btn-primary">
              {content.primaryButtonText || 'Explore Courses'}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to={content.secondaryButtonLink || '/enquiry'} className="btn-secondary">
              {content.secondaryButtonText || 'Talk to Us'}
              <PlayCircle className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
          <div className="card-surface overflow-hidden p-3">
            {content.heroImageUrl || content.imageUrl ? (
              <img
                src={content.heroImageUrl || content.imageUrl}
                alt={content.heroTitle || content.title || 'Loading...'}
                className="h-full min-h-[320px] w-full rounded-[24px] object-cover"
              />
            ) : (
              <div className="flex min-h-[320px] items-center justify-center rounded-[24px] bg-gradient-to-br from-brand-50 to-sky-50 text-slate-400">
                No Image
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
