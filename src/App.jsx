import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import FindInstructors from './pages/Courses'
import SubjectCatalog from './pages/SubjectCatalog'
import InstructorProfile from './pages/InstructorProfile'
import Onboarding from './pages/Onboarding'
import Blogs from './pages/Blogs'
import ContactUs from './pages/ContactUs'
import Login from './pages/Login'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import TutorDashboard from './pages/TutorDashboard'
import StudentDashboard from './pages/StudentDashboard'
import BookingPage from './pages/BookingPage'
import VideoSession from './pages/VideoSession'
import NavBar from './components/NavBar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="min-h-screen bg-brand-dark transition-colors duration-500">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: '#0d1117',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          color: '#fff',
        }}
      />
      <NavBar />
      <Routes>
        {/* Public */}
        <Route path='/' element={<Home />} />
        <Route path='/categories' element={<SubjectCatalog />} />
        <Route path='/find-instructors' element={<FindInstructors />} />
        <Route path='/instructor/:id' element={<InstructorProfile />} />
        <Route path='/booking/:id' element={<BookingPage />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/onboarding' element={<Onboarding />} />

        {/* Dashboards */}
        <Route path='/student-dashboard' element={<StudentDashboard />} />
        <Route path='/tutor-dashboard'   element={<TutorDashboard />} />
        <Route path='/video-session/:channelName' element={<VideoSession />} />
      </Routes>
    </div>
  )
}

export default App
