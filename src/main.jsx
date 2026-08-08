import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CompanyProvider } from './context/CompanyContext'
import { ToastProvider } from './context/ToastContext'
import { AdminAuthProvider } from './context/AdminAuthContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AdminAuthProvider>
          <CompanyProvider>
            <App />
          </CompanyProvider>
        </AdminAuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
