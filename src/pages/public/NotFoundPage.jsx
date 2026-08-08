import { Link } from 'react-router-dom'
import { usePageMeta } from '../../utils/pageMeta'

function NotFoundPage() {
  usePageMeta('Not Found')

  return (
    <div className="section-padding">
      <div className="container-shell">
        <div className="mx-auto max-w-xl rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-premium">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">404</p>
          <h1 className="mt-4 text-4xl font-black text-slate-950">Page not found</h1>
          <p className="mt-4 text-base leading-8 text-slate-600">The page you are looking for is unavailable or may have moved.</p>
          <div className="mt-8 flex justify-center">
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
