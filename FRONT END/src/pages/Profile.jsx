import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { User, Upload, FileText, Award, Save, ArrowLeft } from 'lucide-react'

export default function Profile() {
  const { user, updateProfile, logout } = useAuth()
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState(user?.firstName || user?.name?.split(' ')[0] || '')
  const [lastName, setLastName] = useState(user?.lastName || user?.name?.split(' ')[1] || '')
  const [cv, setCv] = useState(user?.cv || null)
  const [certificates, setCertificates] = useState(user?.certificates || [])
  const [saved, setSaved] = useState(false)

  const handleCvUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Store as object with name and type for demo
      setCv({ name: file.name, type: file.type, size: file.size })
    }
  }

  const handleCertificateUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCertificates([...certificates, { name: file.name, type: file.type, id: Date.now() }])
    }
  }

  const removeCertificate = (id) => {
    setCertificates(certificates.filter(c => c.id !== id))
  }

  const handleSave = () => {
    updateProfile({
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      cv,
      certificates
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!user) return <div className="p-8 text-center">Please login first</div>

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-200 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">

          {/* Name Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700">
              <User className="w-5 h-5" />
              <h2 className="font-semibold">Personal Information</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* CV Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700">
              <FileText className="w-5 h-5" />
              <h2 className="font-semibold">Resume / CV</h2>
            </div>
            {cv && (
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-blue-800">{cv.name}</span>
                <button onClick={() => setCv(null)} className="ml-auto text-red-500 text-sm hover:underline">
                  Remove
                </button>
              </div>
            )}
            <label className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{cv ? 'Replace CV' : 'Upload CV (PDF)'}</span>
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleCvUpload} className="hidden" />
            </label>
          </div>

          <hr className="border-gray-200" />

          {/* Certificates Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Award className="w-5 h-5" />
              <h2 className="font-semibold">Certificates</h2>
            </div>
            {certificates.length > 0 && (
              <div className="space-y-2">
                {certificates.map((cert) => (
                  <div key={cert.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Award className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-800">{cert.name}</span>
                    <button onClick={() => removeCertificate(cert.id)} className="ml-auto text-red-500 text-sm hover:underline">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
            <label className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Add Certificate</span>
              <input type="file" accept=".pdf,.jpg,.png" onChange={handleCertificateUpload} className="hidden" />
            </label>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saved ? 'Saved!' : 'Save Profile'}
          </button>

        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full mt-4 px-4 py-2.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )
}