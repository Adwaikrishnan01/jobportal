import {AiOutlineMenu} from 'react-icons/ai'
import {useState} from "react"
import MenuItem from './MenuItem.jsx'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService.jsx';
import { useDispatch } from 'react-redux';

const UserMenu = ({user}) => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [open,setOpen]=useState(false);
  const logoutHandler = () => {
    logout({dispatch,navigate});
  }
   
  return (
    <div className='p-2 relative rounded-xl shadow-md
     flex flex-row items-center gap-3 cursor-pointer md:px-2 md:py-1
     hover:shadow-lg transition' 
     onClick={()=>{setOpen(!open)}}>
        <img className="rounded-full hidden md:block"
        height="40" width="40" alt="avatar"  
        src={user?.image || "/avatar.jpg"}/>
        <div className="text-gray-600">{user?user.name:"Profile"}</div>
        {open&& <div className='absolute z-50
            rounded-md shadow-md w-[200px]md:w-5/5
             bg-white overflow-hidden right-2 top-12 text-sm'>
                <div className='flex flex-col cursor-pointer'>
              {!user&&<>
              <MenuItem label={"Login"} onClick={()=>{navigate('/login')}}/>
               <MenuItem label={"Register"} onClick={()=>{navigate('/signup')}}/></>}
               {user && <>
               <MenuItem label={"My Profile"} onClick={()=>{navigate('/profile')}}/>
               <MenuItem label={"Your Jobs"} onClick={()=>{navigate('/userjobs')}}/>
               <hr />
               <MenuItem label={"Logout"} onClick={logoutHandler}/></>}
                </div>
            </div>
        }
           
    </div>
  )
}

export default UserMenu