import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { useAuthStore } from '../stores/authStore'
import { 
  Briefcase, 
  FileText, 
  Bookmark, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import StatsCard from '../components/StatsCard'
import JobCard from '../components/JobCard'
import LoadingSpinner from '../components/LoadingSpinner'

export default function CandidateDashboard() {
  const { user } = useAuthStore()
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    savedJobs: 0,
    interviews: 0
  })
  const [recentApplications, setRecentApplications] = useState([])
  const [savedJobs, setSavedJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [appsRes, savedRes] = await Promise.all([
        api.get('/applications/my-applications/'),
        api.get('/jobs/saved/')
      ])

      const applications = appsRes.data.results || []
      const saved = savedRes.data.results || []

      setStats({
        totalApplications: applications.length,
        pendingApplications: applications.filter(a => a.status === 'applied').length,
        savedJobs: saved.length,
        interviews: applications.filter(a => a.status === 'interview').length
      })

      setRecentApplications(applications.slice(0, 5))
      setSavedJobs(saved.slice(0, 3).map(s => s.job))
    } catch (error) {
      console.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'hired':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      case 'interview':
        return <Clock className="w-5 h-5 text-blue-500" />
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      applied: 'bg-yellow-100 text-yellow-700',
      screening: 'bg-blue-100 text-blue-700',
      interview: 'bg-purple-100 text-purple-700',
      technical: 'bg-orange-100 text-orange-700',
      offer: 'bg-green-100 text-green-700',
      hired: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
      withdrawn: 'bg-gray-100 text-gray-700'
    }
    return colors[status] || 'bg-secondary-100 text-secondary-700'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="bg-white border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-secondary-900">
            Welcome back, {user?.first_name || 'Candidate'}!
          </h1>
          <p className="mt-2 text-secondary-600">
            Here's what's happening with your job search
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Applications"
            value={stats.totalApplications}
            icon={FileText}
          />
          <StatsCard
            title="Pending Review"
            value={stats.pendingApplications}
            icon={Clock}
          />
          <StatsCard
            title="Saved Jobs"
            value={stats.savedJobs}
            icon={Bookmark}
          />
          <StatsCard
            title="Interviews"
            value={stats.interviews}
            icon={TrendingUp}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-secondary-900">Recent Applications</h2>
                <Link to="/applications" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </Link>
              </div>

              {recentApplications.length === 0 ? (
                <div className="text-center py-8 text-secondary-500">
                  <Briefcase className="w-12 h-12 mx-auto mb-3 text-secondary-300" />
                  <p>No applications yet. Start applying to jobs!</p>
                  <Link to="/jobs" className="btn-primary mt-4 inline-block">
                    Browse Jobs
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(app.status)}
                        <div>
                          <h3 className="font-medium text-secondary-900">{app.job?.title}</h3>
                          <p className="text-sm text-secondary-600">{app.job?.company_name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`badge ${getStatusColor(app.status)} capitalize`}>
                          {app.status}
                        </span>
                        <span className="text-xs text-secondary-500">
                          {new Date(app.applied_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Saved Jobs */}
          <div>
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-secondary-900">Saved Jobs</h2>
                <Link to="/saved-jobs" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </Link>
              </div>

              {savedJobs.length === 0 ? (
                <div className="text-center py-8 text-secondary-500">
                  <Bookmark className="w-12 h-12 mx-auto mb-3 text-secondary-300" />
                  <p>No saved jobs yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedJobs.map((job) => (
                    <JobCard key={job.id} job={job} showSave={false} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}