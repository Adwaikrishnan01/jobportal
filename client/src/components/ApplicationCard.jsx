import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../utils/AxiosConfig';
import { toast } from 'react-toastify';
import Button from './Button';
import { IoMdAdd } from 'react-icons/io';
import EmptyState from './EmptyState';
import { useNavigate } from 'react-router-dom'
const UserApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('jobs/getjobsbyuser');
                setApplications(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch applications');
                toast.error('Failed to fetch applications');
                setLoading(false);
            }
        };

        fetchApplications();
    }, [user]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (applications.length === 0)
        return <EmptyState message={"You haven't applied to any jobs yet."} />

    return (
        <div>
            <div className='flex justify-end'>
                <div className='w-40'>
                    <Button label={"Apply new"} onClick={() => { navigate('/') }}
                        small icon={IoMdAdd} /></div></div>
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {applications.map((app) => (
                        <div key={app._id} className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-2">{app.job.jobTitle}</h3>
                            <p className="text-gray-600 mb-2">{app.job.companyName}</p>
                            <p className="text-gray-500 mb-2">{app.job.location}</p>
                            <p className="text-sm text-gray-500 mb-4">
                                Applied on: {new Date(app.createdAt).toLocaleDateString()}
                            </p>
                            <p className="font-medium text-fuchsia-600 mb-2">
                                Status: <span className={`py-1 px-3 rounded-full text-xs ${app.status === 'pending' ? 'bg-yellow-200 text-yellow-600' :
                                        app.status === 'accepted' ? 'bg-green-200 text-green-600' :
                                            'bg-red-200 text-red-600'
                                    }`}>{app.status}</span>
                            </p>
                        </div>
                    ))}
                </div>

            </div></div>
    );
};

export default UserApplications;