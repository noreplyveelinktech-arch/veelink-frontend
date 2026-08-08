export const TOKEN_KEY = 'veelink_admin_token'
export const USER_KEY = 'veelink_admin_user'

export const getErrorMessage = (error, fallback = 'Something went wrong.') => {
  if (!error) return fallback

  // No response reached the browser at all: either the API is unreachable (wrong
  // VITE_API_BASE_URL / backend down) or the request was blocked by CORS. Surface this
  // distinctly instead of a misleading fallback like "Invalid credentials."
  if (!error.response && error.request) {
    return 'Unable to reach the server. Check your connection, the API URL, or CORS configuration and try again.'
  }

  const payload = error.response?.data

  if (typeof payload === 'string') return payload
  if (payload?.message) return payload.message
  if (payload?.error) return payload.error

  return error.message || fallback
}

export const getFieldErrors = (error) => {
  const payload = error?.response?.data
  return payload?.errors || payload?.fieldErrors || {}
}

export const excerptText = (text = '', maxLength = 140) => {
  if (!text) return ''
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
}

export const formatCurrency = (value) => {
  if (value === null || value === undefined || value === '') return null
  const numberValue = Number(value)
  if (Number.isNaN(numberValue)) return value
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(numberValue)
}

export const formatDate = (value) => {
  if (!value) return '—'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export const normaliseArray = (value) => {
  if (Array.isArray(value)) return value
  return []
}

export const slugToLabel = (value = '') =>
  value
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^\w/, (char) => char.toUpperCase())

export const socialLinksFromSettings = (settings) => {
  settings = settings || {}
  const entries = [
    ['facebook', settings.facebookUrl || settings.facebook],
    ['instagram', settings.instagramUrl || settings.instagram],
    ['linkedin', settings.linkedinUrl || settings.linkedin],
    ['youtube', settings.youtubeUrl || settings.youtube],
    ['twitter', settings.twitterUrl || settings.twitter],
  ]

  return entries
    .filter(([, url]) => Boolean(url))
    .map(([platform, url]) => ({ platform, url }))
}

export const sortByDisplayOrder = (items = []) =>
  [...items].sort((left, right) => (left.displayOrder ?? left.order ?? 0) - (right.displayOrder ?? right.order ?? 0))

export const createListItem = (overrides = {}) => ({
  id: overrides.id || `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  title: overrides.title || '',
  description: overrides.description || '',
  order: overrides.order ?? 0,
})
