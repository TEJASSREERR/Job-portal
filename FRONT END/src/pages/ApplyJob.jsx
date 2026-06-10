import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Briefcase, FileText, Award, User, Send, Edit3, CheckCircle } from 'lucide-react'

export default function ApplyJob() {
  const { jobId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [coverLetter, setCoverLetter] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // Get stored applications
  const getApplications = () => {
    const stored = localStorage.getItem('applications')
    return stored ? JSON.parse(stored) : []
  }

  const saveApplication = () => {
    const applications = getApplications()
    const newApp = {
      id: Date.now(),
      jobId,
      jobTitle: 'Software Engineer', // Replace with actual job title from props/API
      appliedAt: new Date().toISOString(),
      status: 'Pending',
      coverLetter,
      applicantName: user?.name,
      applicantEmail: user?.email,
      cv: user?.cv,
      certificates: user?.certificates
    }
    localStorage.setItem('applications', JSON.stringify([...applications, newApp]))
    setSubmitted(true)
  }

  if (!user) return <div className="p-8 text-center">Please login to apply</div>

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">Your application has been sent to the employer.</p>
          <button
            onClick={() => navigate('/my-applications')}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View My Applications
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Job Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Apply for: Software Engineer
          </h1>
          <p className="text-gray-600 mt-1">Review your profile before submitting</p>
        </div>

        {/* Profile Preview Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Your Profile
            </h2>
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-xs text-gray-500">First Name</p>
              <p className="font-medium">{user?.firstName || user?.name?.split(' ')[0] || 'Not set'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Last Name</p>
              <p className="font-medium">{user?.lastName || user?.name?.split(' ')[1] || 'Not set'}</p>
            </div>
          </div>

          {/* CV */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Resume / CV</p>
            {user?.cv ? (
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm">{user.cv.name}</span>
              </div>
            ) : (
              <p className="text-sm text-red-500">No CV uploaded — <button onClick={() => navigate('/profile')} className="underline">add one</button></p>
            )}
          </div>

          {/* Certificates */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Certificates ({user?.certificates?.length || 0})</p>
            {user?.certificates?.length > 0 ? (
              <div className="space-y-1">
                {user.certificates.map(c => (
                  <div key={c.id} className="flex items-center gap-2 text-sm">
                    <Award className="w-3 h-3 text-green-600" />
                    {c.name}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No certificates added</p>
            )}
          </div>
        </div>

        {/* Cover Letter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <label className="block font-semibold mb-2">Cover Letter (Optional)</label>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Tell the employer why you're a great fit..."
          />
        </div>

        {/* Submit */}
        <button
          onClick={saveApplication}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Send className="w-4 h-4" />
          Submit Application
        </button>

      </div>
    </div>
  )
}