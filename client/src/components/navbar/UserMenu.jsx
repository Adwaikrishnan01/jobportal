import {AiOutlineMenu} from 'react-icons/ai'
import {useState} from "react"
import MenuItem from './MenuItem.jsx'
import { useNavigate } from 'react-router-dom';

const UserMenu = ({user}) => {
  const navigate=useNavigate()
  const [open,setOpen]=useState(false);
  return (
    <div className='p-2 relative rounded-xl shadow-md
     flex flex-row items-center gap-3 cursor-pointer md:px-2 md:py-1
     hover:shadow-lg transition' 
     onClick={()=>{setOpen(!open)}}>
            {user && <p>Hello {user?.name}</p>}
        <img className="rounded-full hidden md:block"
        height="40" width="40" alt="avatar"  
        src={user?.image || "/avatar.jpg"}/>
        Profile
        {open&& <div className='absolute z-50
            rounded-md shadow-md w-[200px]md:w-5/5
             bg-white overflow-hidden right-2 top-11 text-sm'>
                <div className='flex flex-col cursor-pointer'>
               <MenuItem label={"Login"} onClick={()=>{navigate('/login')}}/>
               <MenuItem label={"Register"} onClick={()=>{navigate('/signup')}}/>
                </div>
            </div>
        }
           
    </div>
  )
}

export default UserMenu