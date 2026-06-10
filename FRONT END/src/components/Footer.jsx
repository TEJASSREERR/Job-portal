import { Briefcase, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold text-white">JobPortal</span>
            </div>
            <p className="text-sm text-gray-400">
              Connecting talent with opportunity across the globe. Find your dream job today.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/jobs" className="hover:text-blue-400">Find Jobs</Link></li>
              <li><Link to="/" className="hover:text-blue-400">Browse Companies</Link></li>
              <li><Link to="/" className="hover:text-blue-400">Career Advice</Link></li>
              <li><Link to="/" className="hover:text-blue-400">Salary Guide</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/post-job" className="hover:text-blue-400">Post a Job</Link></li>
              <li><Link to="/" className="hover:text-blue-400">Search Resumes</Link></li>
              <li><Link to="/" className="hover:text-blue-400">Pricing</Link></li>
              <li><Link to="/" className="hover:text-blue-400">Recruiting Solutions</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@jobportal.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Bangalore, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          © 2026 JobPortal. All rights reserved.
        </div>
      </div>
    </footer>
  )
}