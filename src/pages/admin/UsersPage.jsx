import { useEffect, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import adminUserApi from '../../api/adminUserApi'
import ConfirmDeleteModal from '../../components/shared/ConfirmDeleteModal'
import FormField from '../../components/shared/FormField'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import StatusBadge from '../../components/shared/StatusBadge'
import { useToast } from '../../context/ToastContext'
import { getErrorMessage, normaliseArray } from '../../utils/helpers'
import { usePageMeta } from '../../utils/pageMeta'

const defaultUser = {
  name: '',
  email: '',
  password: '',
  role: 'ADMIN',
  active: true,
}

function UsersPage() {
  usePageMeta('Manage Users')
  const { success, error } = useToast()
  const [users, setUsers] = useState([])
  const [selected, setSelected] = useState(null)
  const [userForm, setUserForm] = useState(defaultUser)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const loadUsers = async () => {
    const response = await adminUserApi.getUsers()
    setUsers(normaliseArray(response))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadUsers()
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const resetForm = () => {
    setUserForm(defaultUser)
    setEditingId(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...userForm,
        active: String(userForm.active) === 'true' || userForm.active === true,
      }

      if (editingId) {
        if (!payload.password) delete payload.password
        await adminUserApi.updateUser(editingId, payload)
      } else {
        await adminUserApi.createUser(payload)
      }

      success(`User ${editingId ? 'updated' : 'created'} successfully.`)
      resetForm()
      await loadUsers()
    } catch (saveError) {
      error(getErrorMessage(saveError, 'Unable to save user.'))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!selected) return
    setDeleting(true)
    try {
      await adminUserApi.deleteUser(selected.id)
      success('User deleted successfully.')
      setSelected(null)
      await loadUsers()
    } catch (deleteError) {
      error(getErrorMessage(deleteError, 'Unable to delete user.'))
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <LoadingSpinner label="Loading..." />

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
      <div className="rounded-[32px] bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Admin Users</h1>
          <p className="mt-2 text-slate-500">Manage admin access, roles, and account status.</p>
        </div>
        <div className="mt-6 space-y-4">
          {users.map((user) => (
            <div key={user.id} className="rounded-3xl border border-slate-200 p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">{user.name}</h3>
                  <p className="text-sm text-slate-600">{user.email}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <StatusBadge value={user.active ? 'ACTIVE' : 'INACTIVE'} />
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">{user.role || 'ADMIN'}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn-secondary px-4 py-2"
                    onClick={() => {
                      setUserForm({ ...defaultUser, ...user, password: '' })
                      setEditingId(user.id)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button type="button" className="btn-danger px-4 py-2" onClick={() => setSelected(user)}>
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
          <h2 className="text-2xl font-bold text-slate-950">{editingId ? 'Edit Admin User' : 'Add Admin User'}</h2>
          <button type="button" className="btn-secondary px-4 py-2" onClick={resetForm}>
            <Plus className="h-4 w-4" />
            New
          </button>
        </div>
        <div className="grid gap-4">
          <FormField label="Name" name="name" value={userForm.name} onChange={(event) => setUserForm((current) => ({ ...current, name: event.target.value }))} />
          <FormField label="Email" name="email" type="email" value={userForm.email} onChange={(event) => setUserForm((current) => ({ ...current, email: event.target.value }))} />
          <FormField
            label={editingId ? 'Change Password' : 'Password'}
            name="password"
            type="password"
            value={userForm.password}
            onChange={(event) => setUserForm((current) => ({ ...current, password: event.target.value }))}
          />
          <FormField
            label="Role"
            name="role"
            as="select"
            value={userForm.role}
            onChange={(event) => setUserForm((current) => ({ ...current, role: event.target.value }))}
            options={[
              { label: 'Admin', value: 'ADMIN' },
              { label: 'Editor', value: 'EDITOR' },
              { label: 'Manager', value: 'MANAGER' },
            ]}
          />
          <FormField
            label="Active"
            name="active"
            as="select"
            value={String(userForm.active)}
            onChange={(event) => setUserForm((current) => ({ ...current, active: event.target.value }))}
            options={[
              { label: 'Active', value: 'true' },
              { label: 'Inactive', value: 'false' },
            ]}
          />
        </div>
        <div className="mt-6 flex justify-end">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Saving...' : editingId ? 'Update User' : 'Create User'}
          </button>
        </div>
      </form>

      <ConfirmDeleteModal
        open={Boolean(selected)}
        title="Delete user?"
        description="This action removes the selected admin account permanently."
        onCancel={() => setSelected(null)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  )
}

export default UsersPage
