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

ReactDOM.createRoot(document.getElementById('root')).render(
 <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> 
   <Provider store={store}>
    <React.StrictMode>
      <EmployerModal/>
      <UpdateProfileModal/>
      <VerifyPhoneModal/>
      <App />
    </React.StrictMode></Provider></GoogleOAuthProvider>
)
