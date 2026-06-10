import { Link } from 'react-router-dom'
import { MapPin, Briefcase, DollarSign, Clock, Bookmark, BookmarkCheck } from 'lucide-react'
import { useState } from 'react'

const CURRENCY_SYMBOLS = {
  INR: '₹', USD: '$', GBP: '£', EUR: '€', AED: 'AED',
  SGD: 'S$', AUD: 'A$', CAD: 'C$', JPY: '¥', BRL: 'R$',
  ZAR: 'R', SAR: 'SR', NZD: 'NZ$'
}

export default function JobCard({ job, showSave = true }) {
  const [isSaved, setIsSaved] = useState(false)

  const formatSalary = () => {
    const symbol = CURRENCY_SYMBOLS[job.salary_currency] || job.salary_currency
    if (job.salary_currency === 'INR') {
      return `${symbol}${(job.salary_min / 100000).toFixed(1)}L - ${(job.salary_max / 100000).toFixed(1)}L`
    }
    return `${symbol}${job.salary_min?.toLocaleString()} - ${job.salary_max?.toLocaleString()}`
  }

  const handleSave = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSaved(!isSaved)
  }

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <span className="text-xl font-bold text-blue-600">
              {job.company_name?.[0] || 'J'}
            </span>
          </div>
          <div>
            <Link to={`/jobs/${job._id || job.id}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600">
              {job.title}
            </Link>
            <p className="text-sm text-gray-600">{job.company_name}</p>
          </div>
        </div>
        {showSave && (
          <button onClick={handleSave} className="p-2 text-gray-400 hover:text-blue-600">
            {isSaved ? <BookmarkCheck className="w-5 h-5 text-blue-600" /> : <Bookmark className="w-5 h-5" />}
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
        <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.job_type?.replace('_', ' ')}</span>
        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.experience_level}</span>
        {job.salary_min > 0 && (
          <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {formatSalary()}</span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {job.skills?.slice(0, 4).map((skill, i) => (
          <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium">
            {skill.name || skill}
          </span>
        ))}
      </div>
    </div>
  )
}