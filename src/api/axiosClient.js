import axios from 'axios'
import { TOKEN_KEY, USER_KEY } from '../utils/helpers'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const requestUrl = error.config?.url || ''
    const isAdminRequest = requestUrl.startsWith('/admin')

    if (status === 401 && isAdminRequest) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)

      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login'
      }
    }

    return Promise.reject(error)
  },
)

export default axiosClient
