import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Briefcase, User, LogOut, Menu, X, Heart, FileText } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Briefcase className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">JobPortal</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/jobs" className="text-gray-600 hover:text-blue-600 font-medium">Find Jobs</Link>
            {isAuthenticated && user?.role === 'employer' && (
              <Link to="/post-job" className="text-gray-600 hover:text-blue-600 font-medium">Post Job</Link>
            )}
            {isAuthenticated ? (
              <>
                <Link to="/saved-jobs" className="text-gray-600 hover:text-blue-600">
                  <Heart className="w-5 h-5" />
                </Link>
                <Link to="/applications" className="text-gray-600 hover:text-blue-600">
                  <FileText className="w-5 h-5" />
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Profile</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 flex items-center gap-2">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Sign In</Link>
                <Link to="/register" className="btn-primary">Get Started</Link>
              </div>
            )}
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4 space-y-3">
          <Link to="/jobs" className="block text-gray-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Find Jobs</Link>
          {isAuthenticated && user?.role === 'employer' && (
            <Link to="/post-job" className="block text-gray-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Post Job</Link>
          )}
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="block text-gray-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
              <Link to="/applications" className="block text-gray-600 font-medium" onClick={() => setMobileMenuOpen(false)}>My Applications</Link>
              <Link to="/saved-jobs" className="block text-gray-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Saved Jobs</Link>
              <button onClick={handleLogout} className="block text-red-600 font-medium">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-gray-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
              <Link to="/register" className="block btn-primary text-center" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}