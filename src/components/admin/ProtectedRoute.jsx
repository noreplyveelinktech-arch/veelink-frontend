import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'
import LoadingSpinner from '../shared/LoadingSpinner'

function ProtectedRoute({ children }) {
  const location = useLocation()
  const { isAuthenticated, loading } = useAdminAuth()

  if (loading) {
    return <LoadingSpinner fullScreen label="Loading..." />
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
