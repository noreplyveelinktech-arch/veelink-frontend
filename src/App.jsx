import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/admin/ProtectedRoute'
import PublicLayout from './components/public/PublicLayout'
import AdminLayout from './components/admin/AdminLayout'
import ScrollToTop from './components/shared/ScrollToTop'
import HomePage from './pages/public/HomePage'
import AboutPage from './pages/public/AboutPage'
import CoursesPage from './pages/public/CoursesPage'
import CourseDetailPage from './pages/public/CourseDetailPage'
import EnquiryPage from './pages/public/EnquiryPage'
import ContactPage from './pages/public/ContactPage'
import NotFoundPage from './pages/public/NotFoundPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import CompanySettingsPage from './pages/admin/CompanySettingsPage'
import HomeContentPage from './pages/admin/HomeContentPage'
import AboutContentPage from './pages/admin/AboutContentPage'
import CoursesListPage from './pages/admin/CoursesListPage'
import CourseFormPage from './pages/admin/CourseFormPage'
import EnquiriesPage from './pages/admin/EnquiriesPage'
import TeamPage from './pages/admin/TeamPage'
import UsersPage from './pages/admin/UsersPage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:id" element={<CourseDetailPage />} />
          <Route path="enquiry" element={<EnquiryPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="company-settings" element={<CompanySettingsPage />} />
          <Route path="home-content" element={<HomeContentPage />} />
          <Route path="about-content" element={<AboutContentPage />} />
          <Route path="courses" element={<CoursesListPage />} />
          <Route path="courses/add" element={<CourseFormPage mode="create" />} />
          <Route path="courses/edit/:id" element={<CourseFormPage mode="edit" />} />
          <Route path="enquiries" element={<EnquiriesPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
