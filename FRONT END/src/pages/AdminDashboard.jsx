import { useEffect, useState } from 'react'
import api from '../services/api'
import { 
  Users, 
  Briefcase, 
  FileText, 
  CheckCircle,
  XCircle,
  Shield,
  TrendingUp
} from 'lucide-react'
import StatsCard from '../components/StatsCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function AdminDashboard() {
  const [data, setData] = useState(null)
  const [pendingRecruiters, setPendingRecruiters] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [dashRes, recruitersRes, usersRes] = await Promise.all([
        api.get('/dashboard/admin/'),
        api.get('/dashboard/recruiters/pending/'),
        api.get('/dashboard/users/')
      ])

      setData(dashRes.data)
      setPendingRecruiters(recruitersRes.data || [])
      setUsers(usersRes.data || [])
    } catch (error) {
      console.error('Failed to load admin dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleApproveRecruiter = async (recruiterId, approved) => {
    try {
      await api.post(`/dashboard/recruiters/${recruiterId}/approve/`, { approved })
      fetchDashboardData()
    } catch (error) {
      console.error('Failed to update recruiter status')
    }
  }

  const handleToggleUser = async (userId, isActive) => {
    try {
      await api.patch(`/dashboard/users/${userId}/`, { is_active: !isActive })
      fetchDashboardData()
    } catch (error) {
      console.error('Failed to update user')
    }
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
          <h1 className="text-3xl font-bold text-secondary-900">Admin Dashboard</h1>
          <p className="mt-2 text-secondary-600">Platform overview and management</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Jobs"
            value={data?.stats?.total_jobs || 0}
            icon={Briefcase}
          />
          <StatsCard
            title="Total Applications"
            value={data?.stats?.total_applications || 0}
            icon={FileText}
          />
          <StatsCard
            title="Candidates"
            value={data?.stats?.total_candidates || 0}
            icon={Users}
          />
          <StatsCard
            title="Recruiters"
            value={data?.stats?.total_recruiters || 0}
            icon={Shield}
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 mb-8">
          <div className="border-b border-secondary-200">
            <nav className="flex gap-8 px-6">
              {['overview', 'users', 'recruiters'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors capitalize ${
                    activeTab === tab
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-secondary-600 hover:text-secondary-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Monthly Stats */}
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4">Monthly Jobs & Applications</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.monthly_stats || []}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="jobs_posted" fill="#3b82f6" name="Jobs Posted" />
                          <Bar dataKey="applications_received" fill="#8b5cf6" name="Applications" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Hires Trend */}
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4">Hires Trend</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data?.monthly_stats || []}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="hires" stroke="#22c55e" name="Hires" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {data?.recent_activities?.map((activity) => (
                      <div key={`${activity.type}-${activity.id}`} className="flex items-center gap-4 p-4 bg-secondary-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'job_posted' ? 'bg-blue-500' : 'bg-green-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-secondary-900">{activity.description}</p>
                          <p className="text-sm text-secondary-500">by {activity.user}</p>
                        </div>
                        <span className="text-xs text-secondary-400">
                          {new Date(activity.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-secondary-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-secondary-700">User</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-secondary-700">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-secondary-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-secondary-700">Joined</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-secondary-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-secondary-100">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-secondary-900">{user.first_name} {user.last_name}</p>
                            <p className="text-sm text-secondary-500">{user.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="badge bg-primary-50 text-primary-700 capitalize">
                            {user.user_type}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`badge ${
                            user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {user.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-secondary-600">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleToggleUser(user.id, user.is_active)}
                            className={`text-sm font-medium ${
                              user.is_active ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'
                            }`}
                          >
                            {user.is_active ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'recruiters' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Pending Recruiter Approvals ({pendingRecruiters.length})
                </h3>
                {pendingRecruiters.length === 0 ? (
                  <p className="text-secondary-500 text-center py-8">No pending approvals</p>
                ) : (
                  pendingRecruiters.map((recruiter) => (
                    <div key={recruiter.id} className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                      <div>
                        <p className="font-medium text-secondary-900">{recruiter.company_name}</p>
                        <p className="text-sm text-secondary-600">{recruiter.user_name} ({recruiter.user_email})</p>
                        <p className="text-sm text-secondary-500">{recruiter.industry} • {recruiter.location}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApproveRecruiter(recruiter.id, false)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleApproveRecruiter(recruiter.id, true)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}