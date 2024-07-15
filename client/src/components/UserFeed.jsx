import React, { useState } from 'react'
import { LuMessageSquarePlus } from "react-icons/lu";



const UserFeed = ({feed,setIsSheetOpen,setselectedUserId,setselectedUserName}) => {
  const openSheet = () => setIsSheetOpen(true);

  async function handleMessage(userId,username){
    openSheet()
    setselectedUserId(userId);
    setselectedUserName(username)
  }
  return (
    <div className='shadow-md bg-white text-gray-700 my-2 max-w-3xl mx-auto border border-gray-200
    rounded-xl'>
        <div className='flex h-20'>
            <div className="w-1/6 px-3 py-2">
            <img src='/avatar.jpg' alt='user' width={60}/>
            </div>
            <div className="w-5/6 flex flex-col px-3 py-2">
            <h2 className='text-2xl'>{feed.feedTitle}</h2>
             <div className='font-thin'>{feed.createdBy.name}</div>
            </div>
        </div>
        <hr/>
        <div className='px-5 py-2 text-sm'>{feed.feedDescription}</div>
        
        <div className='py-1 px-3 flex w-full justify-end' 
        onClick={()=>{handleMessage(feed.createdBy._id,feed.createdBy.name)}}>
          <div className='w-32 flex items-center shadow-md border border-fuchsia-200 hover:bg-fuchsia-100
          px-2 py-1 rounded-md cursor-pointer'>
            <LuMessageSquarePlus size={26}/>
          <p className='font-thin text-fuchsia-600 ml-1'>message</p></div> 
        </div>
    </div>
  )
}

export default UserFeed