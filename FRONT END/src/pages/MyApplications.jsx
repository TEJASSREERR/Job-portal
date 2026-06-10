import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Briefcase, Clock, CheckCircle, XCircle, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function MyApplications() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('applications')
    if (stored) {
      const all = JSON.parse(stored)
      setApplications(all.filter(a => a.applicantEmail === user?.email))
    }
  }, [user])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'Rejected': return <XCircle className="w-5 h-5 text-red-500" />
      default: return <Clock className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted': return 'bg-green-100 text-green-700'
      case 'Rejected': return 'bg-red-100 text-red-700'
      default: return 'bg-yellow-100 text-yellow-700'
    }
  }

  if (!user) return <div className="p-8 text-center">Please login first</div>

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-600" />
          My Applications
        </h1>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-500 mb-4">You haven't applied to any jobs yet.</p>
            <button
              onClick={() => navigate('/jobs')}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map(app => (
              <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{app.jobTitle}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Applied on {new Date(app.appliedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)}
                    {app.status}
                  </span>
                </div>

                {app.coverLetter && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Cover Letter</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{app.coverLetter}</p>
                  </div>
                )}

                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  {app.cv && (
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      CV attached
                    </span>
                  )}
                  <span>{app.certificates?.length || 0} certificates</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}