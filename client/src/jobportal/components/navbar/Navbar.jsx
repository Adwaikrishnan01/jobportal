import { Link, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../../redux/slices/authSlice.js";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { logout } from "../../services/authService.jsx";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  const logoutHandler = () => {
    logout({dispatch,navigate});
  }
   
  const navItems = [
    { id: 1, text: 'Home', link:'/' },
    { id: 2, text: 'Login', link:'/login' },
    { id: 3, text: 'Register', link:'/signup' },
  ];
  const navUserItems = [
    { id: 1, text: 'Home', link:'/jobs' },
    { id: 2, text: 'Feeds', link:'/feeds' },
    { id: 3, text: 'Profile', link:'/profile' },
    { id: 4, text: 'My Jobs', link:'/userjobs' },
    { id: 5, text: 'Logout', link:'/jobs', onClick:logoutHandler},
  ];
  
  
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, dispatch]);
  return (
    <div className="h-20">
      <div className="flex w-full justify-between items-center h-20 bg-white z-10 fixed shadow-sm md:px-4 lg:px-8 px-2 py-3">
        <div className="font-bold text-2xl text-fuchsia-900">
          Jobportal</div>
        {
          <div className="hidden md:flex md:items-center">
            <div className="mx-8 text-fuchsia-900 text-lg space-x-5">
              <Link to='/jobs' className=" hover:text-fuchsia-500 font-serif">Home</Link>
              {isAuthenticated ? user?.role==='admin'&& 
              <Link to='/admin/dashboard' className=" hover:text-fuchsia-500 font-serif">Admin</Link>:''}
              <Link to='/feeds' className=" hover:text-fuchsia-500 font-serif">Feeds</Link></div>
            <UserMenu user={user} />
          </div>
        }
        <div onClick={handleNav} className='md:hidden'>
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-white bg-purple-300 ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 right-[-100%]'
        }>
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold text-fuchsia-900 m-4 '>Jobportal</h1>

        {/* Mobile Navigation Items */}
      {user?navUserItems.map(item=>(
         <Link to={item.link} key={item.id} 
         onClick={item.onClick ? item.onClick : undefined}
         className='p-4 border-b rounded-xl hover:bg-fuchsia-500 duration-300 text-fuchsia-900 font-semibold block
         hover:text-black cursor-pointer border-fuchsia-600'>{item.text}</Link>   
      )):
      navItems.map(item=>(
        <Link to={item.link} key={item.id} 
        onClick={item.onClick ? item.onClick : undefined}
        className='p-4 border-b rounded-xl hover:bg-fuchsia-500 duration-300 text-fuchsia-900 font-semibold block
        hover:text-black cursor-pointer border-fuchsia-600'>{item.text}</Link>))}
          </div>
    </div>
   </div>   
  );
}

export default Navbar;