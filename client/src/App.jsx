import Home from './pages/Home.jsx'
import Register from './pages/Register'
import Login from './pages/Login.jsx'
import Navbar from './components/navbar/Navbar.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store.js';
import UserProfile from './pages/UserProfile';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar/>
        <Routes>
        <Route path="/" element={ <Home/> } />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={ <Register/> } />
          <Route path="/profile" element={<PrivateRoute><UserProfile/></PrivateRoute>} />
        </Routes>
      </Router> 
    </Provider>
  );
};
export default App;
