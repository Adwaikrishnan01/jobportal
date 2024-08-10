import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/ui/Button'
import Sidebar from './Sidebar'
import { openModal } from '../redux/slices/modalSlice'

const AdminAccount = () => {
    const {user} =useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const handleDelete=()=>{
        dispatch(openModal('confirmation'))
    }

  return (
    <section className='w-full bg-fuchsia-50 md:flex'>
        <Sidebar user={user}/>
        <div className="max-w-2xl flex items-center justify-center mx-auto ">
            <div className='shadow-md border border-slate-200 bg-white text-gray-700 py-14 px-5'>
            <div className='w-full flex items-center flex-col gap-1 mb-5'>
                <img className='w-1/6' alt='img' src='/avatar.jpg'/>
                <div>{user.name}</div>
            </div>
            <div className='flex flex-col items-center gap-2 w-full'>
                <div>email : {user.email}</div>
                <div>phone no : {user.phone}</div>
                <div className='w-1/4 mt-4'>
                <Button label={"Delete account"} small onClick={handleDelete}/></div>
                
            </div>
        </div></div>
        
    </section>
  )
}

export default AdminAccount