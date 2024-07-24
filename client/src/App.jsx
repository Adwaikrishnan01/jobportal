import Home from './pages/jobportal/Home.jsx'
import Register from './pages/jobportal/Register.jsx'
import Login from './pages/jobportal/Login.jsx'
import Navbar from './components/navbar/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserProfile from './pages/jobportal/UserProfile.jsx';
import PrivateRoute from './components/PrivateRoute';
import CreateJobPosting from './pages/jobportal/PostJobs.jsx';
import Onboarding from './pages/jobportal/Onboarding.jsx';
import Feeds from './pages/jobportal/Feeds.jsx';
import UserJobs from './pages/jobportal/UserJobs.jsx'
import ApplicantsPage from './pages/jobportal/ApplicantsPage.jsx'
import StudyAbroad from './pages/studyabroad/StudyAbroad.jsx';
import Landing from './pages/Landing.jsx';

const JobPortalRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/jobs" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/onboarding" element={<PrivateRoute><Onboarding /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        <Route path="/userjobs" element={<PrivateRoute><UserJobs /></PrivateRoute>} />
        <Route path="/userjobs/applicants/:jobId" element={<PrivateRoute><ApplicantsPage /></PrivateRoute>} />
        <Route path="/post-job" element={<CreateJobPosting />} />
        <Route path="/feeds" element={<PrivateRoute><Feeds /></PrivateRoute>} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/landing" replace />} />
      <Route path="/landing" element={<Landing/>} />
        <Route path="/studyabroad" element={<StudyAbroad />} />
        <Route path="/*" element={<JobPortalRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;