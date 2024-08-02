import React from 'react'
import userModel from '../../../../server/models/userModel'
import {useNavigate} from 'react-router-dom'

const Sidebar = ({user}) => {
    const navigate=useNavigate()
    const sidebarlist=[
        {
            id:1,
            name:"Dashboard",
            route:"/admin/dashboard",
            icon:'📊'
        },
        {
            id:2,
            name:"Users",
            route:"/admin/manageusers",
             icon: '👥'
        },
        {
            id:3,
            name:"Jobs",
            route:"/admin/managejobs",
            icon: '💼'
        },
        {
            id: 4,
            name: "My Account",
            route: "/admin/myaccount",
            icon: '👤'
        },
        {
            id: 5,
            name: "Settings",
            route: "/admin/settings",
            icon: '⚙️'
        },
    ]
  return (

    <div className='lg:w-1/6 md:1/3 bg-gray-100 min-h-screen border border-r-gray-300'>
        <div className="w-full flex items-center justify-center px-10 py-4 rounded-full">
            <img src='/avatar.jpg' alt='img' className='w-1/2 rounded-full bg-cover'/>
        </div>
        <div className='text-sm text-center'>{user.name}</div>
        
        <div className='mt-4'>
            {sidebarlist.map(item=>(
                <div className='px-4 py-3 hover:bg-fuchsia-300 cursor-pointer border border-t-slate-300 flex gap-2'
                key={item.id}
                onClick={()=>{navigate(`${item.route}`)}}><p>{item.icon}</p>{item.name}</div>
            ))}
        </div>
    </div>
  )
}

export default Sidebar