import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { Bar,Pie } from 'react-chartjs-2';
import axios from '../utils/AxiosConfig';
import { CgCalendarToday } from "react-icons/cg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
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
  
   
      const [applicationStats, setApplicationStats] = useState({
        pending: 0,
        accepted: 0,
        rejected: 0,
      });


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

      const fetchApplicationStats = async () => {
        try {
          const response = await axios.get('/admin/application-stats');
         
          const data = response.data 
          console.log(data)
          setApplicationStats(data);
        } catch (error) {
          console.error('Error fetching application stats:', error);
        }
      };
  
      fetchUserStats();
      fetchJobStats()
      fetchApplicationStats()
    }, []);
  
    const pieChartData = {
      labels: ['Pending', 'Accepted', 'Rejected'],
      datasets: [
        {
          data: [applicationStats.pending, applicationStats.accepted, applicationStats.rejected],
          backgroundColor: [
            'rgba(255, 128, 0, 0.8)',
            'rgba(0, 204, 0, 0.8)', 
            'rgba(255, 0, 0, 0.8)', 
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
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

    const applicationOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Job Application Status',
          font: {
            size: 16,
          },
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
      <div className='text-3xl text-gray-800'>User statistics</div>
    </div>
    <div className='w-full mt-10'>
    <Bar data={userChartData} options={options} className='h-72'/>
    </div>
    <div className='text-md tracking-tight text-purple-800 mt-6 flex items-center px-8 border border-gray-300
    justify-between w-full space-x-4 flex-wrap bg-gray-100 py-4'>
      <div className='flex items-center gap-1'>👥 Total users : {otherUserStats.totaluser}</div>
      <div className='flex items-center gap-1'><CgCalendarToday />New users today : {otherUserStats.regToday}</div>
      <div className='flex items-center gap-1'><CgCalendarToday />New users past month : {otherUserStats.regPastMonth}</div>
      </div>

      <div className='block mt-14 mx-auto'>
      <div className="flex items-center justify-center">
      <div className='bg-blue-400 w-1 h-8 mr-1'></div>
      <div className='text-3xl text-gray-800'>Job statistics</div>
    </div>
    <div className='w-full mt-10'>
    <Bar data={jobChartData} options={options} className='h-72'/>
    </div>
    <div className='text-md tracking-tight text-blue-900 mt-6 flex items-center px-8 border border-gray-300
    justify-between w-full space-x-4 flex-wrap bg-gray-100 py-4'>
      <div>💼 Total jobs : {otherJobStats.totalJobs}</div>
      <div className='flex items-center gap-1'><CgCalendarToday />
      New jobs today : {otherJobStats.jobsToday}</div>
      <div className='flex items-center gap-1'><CgCalendarToday />
      New jobs past month : {otherJobStats.pastMonth}</div>
      </div>
  </div>

  <div className="w-full max-w-md mx-auto p-4 mt-14">
  <div className="flex items-center justify-center mb-8">
      <div className='bg-green-400 w-1 h-8 mr-1'></div>
      <div className='text-3xl text-gray-800'>Application statistics</div>
    </div>
      <div className="mb-4 h-96 w-96">
        <Pie data={pieChartData} options={applicationOptions} />
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-orange-200 p-1 rounded">
          <p className="font-semibold">Pending</p>
          <p className="text-md">{applicationStats.pending}</p>
        </div>
        <div className="bg-green-200 p-1 rounded">
          <p className="font-semibold">Accepted</p>
          <p className="text-md">{applicationStats.accepted}</p>
        </div>
        <div className="bg-red-300 p-1 rounded">
          <p className="font-semibold">Rejected</p>
          <p className="text-md">{applicationStats.rejected}</p>
        </div>
      </div>
    </div>
  </div>  
</div>
  )
}

export default AdminDashboard 