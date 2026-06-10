import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'
import { 
  Users, 
  ArrowLeft, 
  Download,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Mail
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/LoadingSpinner'
import Modal from '../components/Modal'

export default function Applicants() {
  const { jobId } = useParams()
  const [applications, setApplications] = useState([])
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedApp, setSelectedApp] = useState(null)
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [statusUpdate, setStatusUpdate] = useState({
    status: '',
    status_notes: '',
    interview_date: ''
  })

  useEffect(() => {
    fetchData()
  }, [jobId, statusFilter])

  const fetchData = async () => {
    try {
      const [jobRes, appsRes] = await Promise.all([
        api.get(`/jobs/${jobId}/`),
        api.get(`/applications/job/${jobId}/applications/${statusFilter ? `?status=${statusFilter}` : ''}`)
      ])
      setJob(jobRes.data)
      setApplications(appsRes.data.results || [])
    } catch (error) {
      console.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (e) => {
    e.preventDefault()
    try {
      await api.patch(`/applications/${selectedApp.id}/update-status/`, statusUpdate)
      toast.success('Status updated successfully')
      setIsStatusModalOpen(false)
      setSelectedApp(null)
      fetchData()
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const handleDownloadResume = async (appId) => {
    try {
      const res = await api.get(`/applications/${appId}/download-resume/`)
      if (res.data.resume_url) {
        window.open(res.data.resume_url, '_blank')
      }
    } catch (error) {
      toast.error('No resume available')
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

  const statusOptions = [
    { value: 'screening', label: 'Screening' },
    { value: 'interview', label: 'Interview' },
    { value: 'technical', label: 'Technical Assessment' },
    { value: 'offer', label: 'Offer Extended' },
    { value: 'hired', label: 'Hired' },
    { value: 'rejected', label: 'Rejected' },
  ]

  const statusFilters = [
    { value: '', label: 'All' },
    { value: 'applied', label: 'Applied' },
    { value: 'screening', label: 'Screening' },
    { value: 'interview', label: 'Interview' },
    { value: 'offer', label: 'Offer' },
    { value: 'hired', label: 'Hired' },
    { value: 'rejected', label: 'Rejected' },
  ]

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
          <Link to="/recruiter/dashboard" className="inline-flex items-center text-secondary-600 hover:text-primary-600 mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-secondary-900">{job?.title}</h1>
          <p className="mt-2 text-secondary-600">{applications.length} applicants</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === f.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-secondary-600 hover:bg-secondary-50 border border-secondary-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {applications.length === 0 ? (
          <div className="card text-center py-12">
            <Users className="w-12 h-12 mx-auto mb-3 text-secondary-300" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No applicants yet</h3>
            <p className="text-secondary-600">Applications will appear here when candidates apply</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="card">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-primary-600">
                        {app.applicant_name?.charAt(0) || '?'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900">{app.applicant_name}</h3>
                      <p className="text-sm text-secondary-600">{app.applicant_email}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                        <span className={`badge ${getStatusColor(app.status)} capitalize`}>
                          {app.status}
                        </span>
                        <span className="text-secondary-500">
                          Applied {formatDistanceToNow(new Date(app.applied_at))} ago
                        </span>
                        {app.expected_salary && (
                          <span className="text-secondary-600">
                            Expected: ${app.expected_salary?.toLocaleString()}
                          </span>
                        )}
                        {app.notice_period && (
                          <span className="text-secondary-600">
                            Notice: {app.notice_period} days
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {app.resume && (
                      <button
                        onClick={() => handleDownloadResume(app.id)}
                        className="btn-secondary text-sm flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Resume
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedApp(app)
                        setStatusUpdate({
                          status: app.status,
                          status_notes: '',
                          interview_date: ''
                        })
                        setIsStatusModalOpen(true)
                      }}
                      className="btn-primary text-sm"
                    >
                      Update Status
                    </button>
                  </div>
                </div>

                {app.cover_letter && (
                  <div className="mt-4 pt-4 border-t border-secondary-100">
                    <h4 className="text-sm font-medium text-secondary-700 mb-2">Cover Letter</h4>
                    <p className="text-sm text-secondary-600 whitespace-pre-line">{app.cover_letter}</p>
                  </div>
                )}

                {app.status_notes && (
                  <div className="mt-4 pt-4 border-t border-secondary-100">
                    <h4 className="text-sm font-medium text-secondary-700 mb-2">Notes</h4>
                    <p className="text-sm text-secondary-600">{app.status_notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Update Modal */}
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title="Update Application Status"
      >
        <form onSubmit={handleUpdateStatus} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Status</label>
            <select
              required
              className="input-field"
              value={statusUpdate.status}
              onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {statusUpdate.status === 'interview' && (
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Interview Date</label>
              <input
                type="datetime-local"
                className="input-field"
                value={statusUpdate.interview_date}
                onChange={(e) => setStatusUpdate({ ...statusUpdate, interview_date: e.target.value })}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Notes</label>
            <textarea
              rows={3}
              className="input-field"
              placeholder="Add notes about this status change..."
              value={statusUpdate.status_notes}
              onChange={(e) => setStatusUpdate({ ...statusUpdate, status_notes: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsStatusModalOpen(false)}
              className="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              Update Status
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}