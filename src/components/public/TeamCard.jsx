import { Linkedin } from 'lucide-react'

function TeamCard({ member }) {
  return (
    <div className="card-surface overflow-hidden">
      {member.photoUrl ? (
        <img src={member.photoUrl} alt={member.fullName} className="h-72 w-full object-cover" />
      ) : (
        <div className="flex h-72 items-center justify-center bg-gradient-to-br from-brand-50 to-sky-50 text-slate-400">Loading...</div>
      )}
      <div className="space-y-3 p-6">
        <div>
          <h3 className="text-xl font-bold text-slate-950">{member.fullName}</h3>
          <p className="text-sm font-medium text-brand-600">{member.designation || 'Loading...'}</p>
        </div>
        <p className="text-sm leading-7 text-slate-600">{member.description || 'Loading...'}</p>
        {member.linkedinUrl ? (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
          >
            <Linkedin className="h-4 w-4" />
            View Profile
          </a>
        ) : null}
      </div>
    </div>
  )
}

export default TeamCard
