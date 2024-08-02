import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { Bar } from 'react-chartjs-2';
import axios from '../utils/AxiosConfig';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const AdminDashboard = () => {
    const [otherUserStats,setOtherUserStats]=useState({})
    const [userChartData, setUserChartData] = useState({
      labels: [],
      datasets: [],
    });
    const [otherJobStats,setOtherJobStats]=useState({})
    const [jobChartData, setJobChartData] = useState({
      labels: [],
      datasets: [],
    })
  
    useEffect(() => {
      const fetchUserStats = async () => {
        try {
          const response = await axios.get('/admin/user-stats'); 
          const data = response.data;
          const stats=data.stats
          const labels = stats.map(stat => stat._id);
          const counts = stats.map(stat => stat.count);
          const otherUserStats=data.otherStats
          setOtherUserStats(otherUserStats)
          setUserChartData({
            labels,
            datasets: [
              {
                label: 'Total Users',
                data: counts,
                backgroundColor: 'rgba(204, 0, 204, 0.3)',
                borderColor: 'rgba(204, 0, 204, .5)',
                borderWidth: 1,
              },
            ],
          });
        } catch (error) {
          console.error('Error fetching user stats:', error);
        }
      };

      const fetchJobStats = async () => {
        try {
          const response = await axios.get('/admin/job-stats'); 
          const data = response.data;
          const stats=data.stats
          const labels = stats.map(stat => stat._id);
          const counts = stats.map(stat => stat.count);
          const otherJobStats=data.otherStats
          setOtherJobStats(otherJobStats)
          setJobChartData({
            labels,
            datasets: [
              {
                label: 'Total jobs',
                data: counts,
                backgroundColor: 'rgba(0, 128, 255, 0.3)',
                borderColor: 'rgba(0, 128, 255, .5)',
                borderWidth: 1,
              },
            ],
          });
        } catch (error) {
          console.error('Error fetching user stats:', error);
        }
      };
  
      fetchUserStats();
      fetchJobStats()
    }, []);
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Registrations Over Time',
        },
      },
    };
  const {user} = useSelector(state=>state.auth)
  return (
    <div className='w-full md:flex'>
    <Sidebar user={user}/>
    <div className='block my-4 mx-auto'>
    <div className="flex items-center justify-center">
      <div className='bg-fuchsia-400 w-1 h-8 mr-1'></div>
      <div className='text-3xl text-gray-800'>User stats</div>
    </div>
    <div className='w-full mt-10'>
    <Bar data={userChartData} options={options} className='h-72'/>
    </div>
    <div className='text-sm tracking-tight text-fuchsia-800 mt-3 flex items-center px-8 shadow-md
    justify-between w-full space-x-4 flex-wrap bg-gray-100 py-2'>
      <div>Total users : {otherUserStats.totaluser}</div>
      <div>New users today : {otherUserStats.regToday}</div>
      <div>New users past month : {otherUserStats.regPastMonth}</div>
      </div>

      <div className='block mt-14 mx-auto'>
      <div className="flex items-center justify-center">
      <div className='bg-blue-400 w-1 h-8 mr-1'></div>
      <div className='text-3xl text-gray-800'>Job stats</div>
    </div>
    <div className='w-full mt-10'>
    <Bar data={jobChartData} options={options} className='h-72'/>
    </div>
    <div className='text-sm tracking-tight text-blue-800 mt-3 flex items-center px-8 shadow-md
    justify-between w-full space-x-2 flex-wrap bg-gray-100 py-2'>
      <div>Total jobs : {otherJobStats.totalJobs}</div>
      <div>New jobs today : {otherJobStats.jobsToday}</div>
      <div>New jobs past month : {otherJobStats.pastMonth}</div>
      </div>
  </div>
  </div>

  
</div>
  )
}

export default AdminDashboard 