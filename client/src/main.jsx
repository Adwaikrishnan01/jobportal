import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './redux/store/store.js'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';
import EmployerModal from './components/Modals/EmployerModal.jsx'
import UpdateProfileModal from './components/Modals/ProfileUpdate.jsx'
import VerifyPhoneModal from './components/Modals/VerifyPhone.jsx'
import { ToastContainer } from 'react-toastify'
import PostJobModal from './components/Modals/PostJobModal.jsx'
import PostFeedModal from './components/Modals/PostFeed.jsx'
import NotificationModal from './components/Modals/NotificationModal.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> 
   <Provider store={store}>
      <React.StrictMode>
      <ToastContainer position='top-center'/>
      <EmployerModal/>
      <UpdateProfileModal/>
      <VerifyPhoneModal/>
      <PostJobModal/>
      <PostFeedModal/>
      <NotificationModal/>
      <App />
      </React.StrictMode>
   </Provider>
  </GoogleOAuthProvider>
)