import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { LockKeyhole } from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { useToast } from '../../context/ToastContext'
import FormField from '../../components/shared/FormField'
import { getErrorMessage } from '../../utils/helpers'
import { usePageMeta } from '../../utils/pageMeta'

function AdminLoginPage() {
  usePageMeta('Admin Login')
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loading, isAuthenticated } = useAdminAuth()
  const { error } = useToast()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [formError, setFormError] = useState('')

  if (isAuthenticated && !loading) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setFormError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.email || !formData.password) {
      setFormError('Email and password are required.')
      return
    }

    try {
      await login(formData)
      const redirectTo = location.state?.from?.pathname || '/admin/dashboard'
      navigate(redirectTo, { replace: true })
    } catch (loginError) {
      const fallback = loginError?.response ? 'Invalid credentials.' : 'Something went wrong.'
      const message = getErrorMessage(loginError, fallback)
      setFormError(message)
      error(message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-50 text-brand-600">
            <LockKeyhole className="h-8 w-8" />
          </div>
          <h1 className="mt-5 text-3xl font-black text-slate-950">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to manage content and enquiries.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <FormField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
          {formError ? <p className="text-sm text-rose-600">{formError}</p> : null}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLoginPage
