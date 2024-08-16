import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './jobportal/redux/store/store.js'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google';
import EmployerModal from './jobportal/components/Modals/EmployerModal.jsx'
import UpdateProfileModal from './jobportal/components/Modals/ProfileUpdate.jsx'
import VerifyPhoneModal from './jobportal/components/Modals/VerifyPhone.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostJobModal from './jobportal/components/Modals/PostJobModal.jsx'
import PostFeedModal from './jobportal/components/Modals/PostFeed.jsx'
import NotificationModal from './jobportal/components/Modals/NotificationModal.jsx'
import ConfirmationModal from './jobportal/components/Modals/ConfirmationModal.jsx'

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
      <ConfirmationModal/>
      <App />
      </React.StrictMode>
   </Provider>
  </GoogleOAuthProvider>
)