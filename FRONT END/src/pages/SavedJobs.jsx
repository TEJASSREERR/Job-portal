import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { Bookmark, ArrowRight } from 'lucide-react'
import JobCard from '../components/JobCard'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSavedJobs()
  }, [])

  const fetchSavedJobs = async () => {
    try {
      const res = await api.get('/jobs/saved/')
      setSavedJobs(res.data.results?.map(item => item.job) || [])
    } catch (error) {
      console.error('Failed to load saved jobs')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="bg-white border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-secondary-900">Saved Jobs</h1>
          <p className="mt-2 text-secondary-600">Jobs you've bookmarked for later</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : savedJobs.length === 0 ? (
          <EmptyState
            title="No saved jobs"
            description="Browse jobs and click the bookmark icon to save them for later."
            action={
              <Link to="/jobs" className="btn-primary flex items-center gap-2">
                Browse Jobs <ArrowRight className="w-4 h-4" />
              </Link>
            }
          />
        ) : (
          <div className="space-y-4">
            {savedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}