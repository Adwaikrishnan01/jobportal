import Home from './jobportal/pages/Home.jsx'
import Register from './jobportal/pages/Register.jsx'
import Login from './jobportal/pages/Login.jsx'
import Navbar from './jobportal/components/navbar/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserProfile from './jobportal/pages/UserProfile.jsx';
import PrivateRoute from './jobportal/components/route/PrivateRoute';
import CreateJobPosting from './jobportal/pages/PostJobs.jsx';
import Onboarding from './jobportal/pages/Onboarding.jsx';
import Feeds from './jobportal/pages/Feeds.jsx';
import UserJobs from './jobportal/pages/UserJobs.jsx'
import ApplicantsPage from './jobportal/pages/ApplicantsPage.jsx'
import StudyAbroad from './studyabroad/pages/index.jsx';
import Landing from './pages/Landing.jsx';
import CountryList from './studyabroad/pages/CountryList.jsx';
import CountryInfo from './studyabroad/pages/CountryInfo.jsx';
import ManageUsers from './jobportal/admin/ManageUsers.jsx';
import ManageJobs from './jobportal/admin/ManageJobs.jsx';
import AdminDashboard from './jobportal/admin/AdminDashboard.jsx';
import AdminAccount from './jobportal/admin/AdminAccount.jsx';

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
        <Route path="/admin/dashboard" element={<PrivateRoute adminOnly={true}> <AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/manageusers" element={<PrivateRoute adminOnly={true}> <ManageUsers /></PrivateRoute>} />
        <Route path="/admin/managejobs" element={<PrivateRoute adminOnly={true}> <ManageJobs /></PrivateRoute>} />
        <Route path="/admin/myaccount" element={<PrivateRoute adminOnly={true}> <AdminAccount /></PrivateRoute>} />
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
        <Route path="/studyabroad/countries" element={<CountryList />} />
        <Route path="/studyabroad/country/:name" element={<CountryInfo />} />
        <Route path="/*" element={<JobPortalRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;