import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import './index.css'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

const RootWrapper = ({ children }) => {
  if (!googleClientId) {
    console.warn('VITE_GOOGLE_CLIENT_ID not set — Google login disabled')
    return <>{children}</>
  }
  return <GoogleOAuthProvider clientId={googleClientId}>{children}</GoogleOAuthProvider>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RootWrapper>
        <AuthProvider>
          <App />
        </AuthProvider>
      </RootWrapper>
    </BrowserRouter>
  </React.StrictMode>
)