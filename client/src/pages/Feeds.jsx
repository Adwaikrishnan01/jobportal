import React, { useEffect, useState } from 'react'
import UserFeed from '../components/UserFeed'
import axios from 'axios';
import { API_URL } from '../utils/API';
import Button from '../components/Button';
import { IoCreateOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../redux/slices/modalSlice';
import Sheet from '../components/Sheet';
import ChatHeader from '../components/chat/ChatHeader';
import UserList from '../components/chat/UserList';
import UserMessage from '../components/chat/UserMessage';

const Feeds = () => {
  const [feeds, setFeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedUserId, setselectedUserId] = useState(null);
  const {user} = useSelector(state=>state.auth)
  const[roomId,setRoomId]=useState()
  const [selectedUserName,setselectedUserName]=useState()
  const userId=user?._id

 
  const closeSheet = () => {
    setIsSheetOpen(false);
    setselectedUserId(null);
  };

  const handleBackToList = () => {
    setselectedUserId(null);
    setRoomId(null)
  };

  const onUserClick=(userId,username)=>{
    console.log("parentusername userid",userId,username)
    setselectedUserId(userId);
    setselectedUserName(username)
    setIsSheetOpen(true)
   }
  const dispatch=useDispatch()
  useEffect(() => {
    const fetchFeedPostings = async () => {
      try {
        const response = await axios.get(`${API_URL}/feeds/getallfeeds`);
      
        const {data} =response
        setFeeds(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedPostings();
  }, []);

  const handleCreateNewFeed = () => {
    dispatch(openModal('postfeed'));
    
  };

  if(feeds.length===0){
    return (
    <div>
     <p className='text-red-500 mx-3 md:mx-8'>Feeds are empty</p> 
      <div className='w-full flex items-center justify-end px-4'>
       <div className='w-48'>
        <Button label={"Post your feed"} small onClick={handleCreateNewFeed} icon={IoCreateOutline}/>
        </div> 
      </div>
      </div>
      )
  }
  if(error)
    return <div>Error:{error}</div>
  
  return (
    <section className="bg-gray-50 min-h-screen"> 
     
      <Sheet isOpen={isSheetOpen} onClose={closeSheet}>
        {selectedUserId ? (
          <UserMessage selectedUserId={selectedUserId} onBack={handleBackToList} userId={userId} 
          selectedUserName={selectedUserName}/>
        ) : (
          <>
            <ChatHeader/>
            <UserList  
            onUserClick={onUserClick}
            /> 
          </>
        )}
      </Sheet>
     
      <div className='w-full flex items-center justify-end px-2 h-20 mx-auto md:px-20 lg:px-40'>
      <div className='w-48'>
        <Button label={"Post your feed"} small onClick={handleCreateNewFeed} icon={IoCreateOutline}/>
        </div> 
      </div>
    
     <div className='space-y-4 mx-2'>
     {
     feeds.map((feed,index)=>(
      <UserFeed feed={feed} key={index} 
      setIsSheetOpen={setIsSheetOpen} 
      setselectedUserId={setselectedUserId}
      setselectedUserName={setselectedUserName}
      />
     ))}
     </div>
          
    </section>
  )
}

export default Feeds;
