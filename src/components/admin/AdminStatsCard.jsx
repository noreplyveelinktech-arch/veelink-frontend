function AdminStatsCard({ title, value, helper }) {
  return (
    <div className="rounded-[28px] bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-4 text-3xl font-black text-slate-950">{value}</p>
      {helper ? <p className="mt-3 text-sm text-slate-500">{helper}</p> : null}
    </div>
  )
}

export default AdminStatsCard
