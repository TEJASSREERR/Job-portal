import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import JobList from './pages/JobList'
import JobDetail from './pages/JobDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import MyApplications from './pages/MyApplications'
import PostJob from './pages/PostJob'
import SavedJobs from './pages/SavedJobs'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import RecruiterDashboard from './pages/RecruiterDashboard'
import ApplyJob from './pages/ApplyJob'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/apply/:jobId" element={<ApplyJob />} />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/applications" element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          } />
          <Route path="/post-job" element={
            <ProtectedRoute allowedRoles={['employer', 'admin']}>
              <PostJob />
            </ProtectedRoute>
          } />
          <Route path="/saved-jobs" element={
            <ProtectedRoute>
              <SavedJobs />
            </ProtectedRoute>
          } />
          <Route path="/recruiter" element={
  <ProtectedRoute allowedRoles={['employer', 'admin']}>
    <RecruiterDashboard />
  </ProtectedRoute>
} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App