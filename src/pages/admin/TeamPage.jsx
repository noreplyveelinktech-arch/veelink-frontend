import { useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import adminTeamApi from '../../api/adminTeamApi'
import ConfirmDeleteModal from '../../components/shared/ConfirmDeleteModal'
import FormField from '../../components/shared/FormField'
import ImageUrlField from '../../components/shared/ImageUrlField'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import { useToast } from '../../context/ToastContext'
import { getErrorMessage, normaliseArray } from '../../utils/helpers'
import { usePageMeta } from '../../utils/pageMeta'

const defaultMember = {
  fullName: '',
  designation: '',
  description: '',
  photoUrl: '',
  linkedinUrl: '',
  displayOrder: 0,
  active: true,
}

function TeamPage() {
  usePageMeta('Manage Team')
  const { success, error } = useToast()
  const [members, setMembers] = useState([])
  const [selected, setSelected] = useState(null)
  const [memberForm, setMemberForm] = useState(defaultMember)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const loadMembers = async () => {
    const response = await adminTeamApi.getMembers()
    setMembers(normaliseArray(response))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadMembers()
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const resetForm = () => {
    setMemberForm(defaultMember)
    setEditingId(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    try {
      const payload = { ...memberForm, displayOrder: Number(memberForm.displayOrder || 0), active: String(memberForm.active) === 'true' || memberForm.active === true }
      if (editingId) {
        await adminTeamApi.updateMember(editingId, payload)
      } else {
        await adminTeamApi.createMember(payload)
      }
      success(`Team member ${editingId ? 'updated' : 'created'} successfully.`)
      resetForm()
      await loadMembers()
    } catch (saveError) {
      error(getErrorMessage(saveError, 'Unable to save team member.'))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!selected) return
    setDeleting(true)
    try {
      await adminTeamApi.deleteMember(selected.id)
      success('Team member deleted successfully.')
      setSelected(null)
      await loadMembers()
    } catch (deleteError) {
      error(getErrorMessage(deleteError, 'Unable to delete team member.'))
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <LoadingSpinner label="Loading..." />

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
      <div className="rounded-[32px] bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-950">Team Members</h1>
            <p className="mt-2 text-slate-500">Maintain mentor and faculty profiles.</p>
          </div>
        </div>
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="rounded-3xl border border-slate-200 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">{member.fullName}</h3>
                  <p className="text-sm text-brand-600">{member.designation}</p>
                  <p className="mt-2 text-sm text-slate-600">{member.description}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="btn-secondary px-4 py-2" onClick={() => { setMemberForm({ ...defaultMember, ...member }); setEditingId(member.id) }}>
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button type="button" className="btn-danger px-4 py-2" onClick={() => setSelected(member)}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form className="rounded-[32px] bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-950">{editingId ? 'Edit Team Member' : 'Add Team Member'}</h2>
          <button type="button" className="btn-secondary px-4 py-2" onClick={resetForm}>
            <Plus className="h-4 w-4" />
            New
          </button>
        </div>
        <div className="grid gap-4">
          <FormField label="Full Name" name="fullName" value={memberForm.fullName} onChange={(event) => setMemberForm((current) => ({ ...current, fullName: event.target.value }))} />
          <FormField label="Designation" name="designation" value={memberForm.designation} onChange={(event) => setMemberForm((current) => ({ ...current, designation: event.target.value }))} />
          <FormField label="Description" name="description" as="textarea" rows={4} value={memberForm.description} onChange={(event) => setMemberForm((current) => ({ ...current, description: event.target.value }))} />
          <ImageUrlField label="Photo URL" name="photoUrl" value={memberForm.photoUrl} onChange={(event) => setMemberForm((current) => ({ ...current, photoUrl: event.target.value }))} />
          <FormField label="LinkedIn URL" name="linkedinUrl" value={memberForm.linkedinUrl} onChange={(event) => setMemberForm((current) => ({ ...current, linkedinUrl: event.target.value }))} />
          <FormField label="Display Order" name="displayOrder" type="number" value={memberForm.displayOrder} onChange={(event) => setMemberForm((current) => ({ ...current, displayOrder: event.target.value }))} />
          <FormField
            label="Active"
            name="active"
            as="select"
            value={String(memberForm.active)}
            onChange={(event) => setMemberForm((current) => ({ ...current, active: event.target.value }))}
            options={[
              { label: 'Active', value: 'true' },
              { label: 'Inactive', value: 'false' },
            ]}
          />
        </div>
        <div className="mt-6 flex justify-end">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Saving...' : editingId ? 'Update Member' : 'Create Member'}
          </button>
        </div>
      </form>

      <ConfirmDeleteModal
        open={Boolean(selected)}
        title="Delete team member?"
        description="This action removes the selected team member permanently."
        onCancel={() => setSelected(null)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  )
}

export default TeamPage
