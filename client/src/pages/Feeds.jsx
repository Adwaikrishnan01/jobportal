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

  // const users = [
  //   { id: 1, name: 'Alice' },
  //   { id: 2, name: 'Bob' },
  //   { id: 3, name: 'Charlie' },
  // ];

 
  const closeSheet = () => {
    setIsSheetOpen(false);
    setselectedUserId(null);
  };

  const handleBackToList = () => {
    setselectedUserId(null);
    setRoomId(null)
  };


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
    return <div>
      Feeds are empty
      <div className='w-full flex items-center justify-end px-4'>
       <div className='w-48'>
        <Button label={"Post your feed"} small onClick={handleCreateNewFeed} icon={IoCreateOutline}/>
        </div> 
      </div>
      </div>
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
            {/* <UserList users={users} onUserClick={handleUserClick} /> */}
          </>
        )}
      </Sheet>
     
      <div className='max-w-4xl flex items-center justify-end px-4 h-20'>
      <div className='w-48'>
        <Button label={"Post your feed"} small onClick={handleCreateNewFeed} icon={IoCreateOutline}/>
        </div> 
      </div>
     <div className='font-thin text-fuchsia-700 mx-5 my-3'>
      showing similar users feeds
     </div>
     <div className='space-y-4'>
     {feeds.map((feed,index)=>(
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
