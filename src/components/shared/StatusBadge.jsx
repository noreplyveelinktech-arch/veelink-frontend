const styles = {
  ACTIVE: 'bg-emerald-100 text-emerald-700',
  INACTIVE: 'bg-slate-200 text-slate-700',
  PENDING: 'bg-amber-100 text-amber-700',
  CONTACTED: 'bg-sky-100 text-sky-700',
  CLOSED: 'bg-violet-100 text-violet-700',
  FAILED: 'bg-rose-100 text-rose-700',
  SENT: 'bg-emerald-100 text-emerald-700',
}

function StatusBadge({ value }) {
  const text = value || 'Unknown'
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[text] || 'bg-slate-100 text-slate-700'}`}>
      {text}
    </span>
  )
}

export default StatusBadge
