import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import { 
  Briefcase, 
  Plus, 
  X,
  ChevronDown
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function PostJob() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    job_type: 'full_time',
    experience_level: 'any',
    location: '',
    is_remote: false,
    salary_min: '',
    salary_max: '',
    salary_currency: 'USD',
    salary_period: 'yearly',
    category: '',
    skills_required_ids: [],
    status: 'draft'
  })

  useEffect(() => {
    fetchCategories()
    fetchSkills()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await api.get('/jobs/categories/')
      setCategories(res.data)
    } catch (error) {
      console.error('Failed to load categories')
    }
  }

  const fetchSkills = async () => {
    try {
      const res = await api.get('/profiles/skills/')
      setSkills(res.data)
    } catch (error) {
      console.error('Failed to load skills')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        ...formData,
        salary_min: formData.salary_min ? parseFloat(formData.salary_min) : null,
        salary_max: formData.salary_max ? parseFloat(formData.salary_max) : null,
        category: formData.category || null
      }

      await api.post('/jobs/recruiter/create/', payload)
      toast.success('Job posted successfully!')
      navigate('/recruiter/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to post job')
    } finally {
      setLoading(false)
    }
  }

  const toggleSkill = (skillId) => {
    setFormData(prev => ({
      ...prev,
      skills_required_ids: prev.skills_required_ids.includes(skillId)
        ? prev.skills_required_ids.filter(id => id !== skillId)
        : [...prev.skills_required_ids, skillId]
    }))
  }

  const jobTypes = [
    { value: 'full_time', label: 'Full Time' },
    { value: 'part_time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Internship' },
    { value: 'remote', label: 'Remote' },
  ]

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior Level' },
    { value: 'lead', label: 'Lead/Manager' },
    { value: 'executive', label: 'Executive' },
    { value: 'any', label: 'Any Level' },
  ]

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="bg-white border-b border-secondary-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-secondary-900">Post a New Job</h1>
          <p className="mt-2 text-secondary-600">Create a job listing to find the perfect candidate</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="e.g. Senior React Developer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Category</label>
                  <select
                    className="input-field"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Job Type *</label>
                  <select
                    required
                    className="input-field"
                    value={formData.job_type}
                    onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
                  >
                    {jobTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Experience Level *</label>
                  <select
                    required
                    className="input-field"
                    value={formData.experience_level}
                    onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
                  >
                    {experienceLevels.map((level) => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    placeholder="e.g. San Francisco, CA"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_remote}
                  onChange={(e) => setFormData({ ...formData, is_remote: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <span className="text-secondary-700">Remote position available</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Job Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Description *</label>
                <textarea
                  required
                  rows={5}
                  className="input-field"
                  placeholder="Describe the role, team, and company..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Requirements *</label>
                <textarea
                  required
                  rows={4}
                  className="input-field"
                  placeholder="List the required skills and qualifications..."
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Responsibilities *</label>
                <textarea
                  required
                  rows={4}
                  className="input-field"
                  placeholder="Describe the day-to-day responsibilities..."
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Benefits</label>
                <textarea
                  rows={3}
                  className="input-field"
                  placeholder="List benefits, perks, and compensation..."
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Salary */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Compensation</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Min Salary</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="50000"
                  value={formData.salary_min}
                  onChange={(e) => setFormData({ ...formData, salary_min: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Max Salary</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="100000"
                  value={formData.salary_max}
                  onChange={(e) => setFormData({ ...formData, salary_max: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Currency</label>
                <select
                  className="input-field"
                  value={formData.salary_currency}
                  onChange={(e) => setFormData({ ...formData, salary_currency: e.target.value })}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                  <option value="AUD">AUD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => toggleSkill(skill.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    formData.skills_required_ids.includes(skill.id)
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                  }`}
                >
                  {skill.name}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary py-3 flex items-center justify-center disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Briefcase className="w-5 h-5 mr-2" />
                  Publish Job
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/recruiter/dashboard')}
              className="flex-1 btn-secondary py-3"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}