import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Users, Clock, MapPin, Calendar, ChevronRight } from 'lucide-react'

const ALL_JOBS = [
  // Copy the same ALL_JOBS array from JobList.jsx here (or import it)
]

export default function RecruiterDashboard() {
  const [postedJobs, setPostedJobs] = useState([])
  const [applicants, setApplicants] = useState([])

  useEffect(() => {
    // In real app, fetch from API. For demo, filter jobs by "employer" role
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    
    // Demo: show all jobs as "posted" and applications as "received"
    const apps = JSON.parse(localStorage.getItem('myApplications') || '[]')
    setApplicants(apps)
    
    // Mock: first 5 jobs as "posted by this recruiter"
    setPostedJobs(ALL_JOBS.slice(0, 5))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recruiter Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your job postings and applicants</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{postedJobs.length}</p>
                <p className="text-sm text-gray-500">Active Jobs</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{applicants.length}</p>
                <p className="text-sm text-gray-500">Total Applicants</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {postedJobs.filter(j => new Date(j.expires_at) > new Date()).length}
                </p>
                <p className="text-sm text-gray-500">Open Positions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Posted Jobs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">My Job Postings</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {postedJobs.map(job => (
              <div key={job.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Expires: {new Date(job.expires_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium">
                    {job.applications_count} applicants
                  </span>
                  <Link to={`/jobs/${job.id}`} className="text-blue-600 hover:text-blue-700">
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applicants */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Applicants</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {applicants.length === 0 ? (
              <div className="p-12 text-center text-gray-500">No applications received yet</div>
            ) : (
              applicants.map((app, index) => (
                <div key={index} className="p-6 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Applicant #{index + 1}</p>
                      <p className="text-sm text-gray-500">Applied for {app.title}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full font-medium capitalize">
                    {app.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}