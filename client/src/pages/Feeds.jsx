import React, { useEffect, useState } from 'react'
import UserFeed from '../components/UserFeed'
import axios from 'axios';
import { API_URL } from '../utils/API';
import Button from '../components/Button';
import { IoCreateOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/slices/modalSlice';
const Feeds = () => {
  const [feeds, setFeeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null);
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
      <div className='w-full flex items-center justify-end px-4 h-20'>
      <div className='w-48'>
        <Button label={"Post your feed"} small onClick={handleCreateNewFeed} icon={IoCreateOutline}/>
        </div> 
      </div>
     <div className='font-thin text-fuchsia-700 mx-5 my-3'>
      showing similar users feeds
     </div>
     <div className='space-y-4'>
     {feeds.map((feed,index)=>(
      <UserFeed feed={feed} key={index}/>
     ))}
     </div>
    </section>
  )
}

export default Feeds;
