import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../utils/AxiosConfig';
import { toast } from 'react-toastify';
import { handleDownloadResume } from '../actions/Actions';
import Button from '../components/Button';

const JobApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { jobId } = useParams();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const fetchApplicants = async () => {
    try {
      const response = await axios.get(`/jobs/getapplicantsforjob/${jobId}`);
      setApplicants(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch applicants');
      toast.error('Failed to fetch applicants');
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await axios.patch(`/jobs/applications/status/${applicationId}`, 
        { status: newStatus }
      );
      setApplicants(applicants.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      ));
      toast.success('Application status updated successfully');
    } catch (err) {
      toast.error('Failed to update application status');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className=" bg-purple-50 min-h-screen">
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Job Applicants</h2>
      {applicants.length === 0 ? (
        <p>No applicants for this job yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-fuchsia-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Resume</th>
                <th className="py-3 px-6 text-left">Applied On</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm ">
              {applicants.map((applicant,index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{applicant.applicantName}</td>
                  <td className="py-3 px-6 text-left">{applicant.applicantEmail}</td>
                  <td className="py-3 px-6 text-left">{!applicant.applicantPhone?"not provided":applicant.applicantPhone}</td>
                  <td className="pb-2 px-6 text-left">
                      <Button small outline label={"View"} onClick={()=>{handleDownloadResume(applicant.applicantId)}}/></td>
                  <td className="py-3 px-6 text-left">
                    {new Date(applicant.appliedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span className={`py-1 px-3 rounded-full text-xs ${
                      applicant.status === 'pending' ? 'bg-yellow-200 text-yellow-600' :
                      applicant.status === 'reviewed' ? 'bg-blue-200 text-blue-600' :
                      applicant.status === 'accepted' ? 'bg-green-200 text-green-600' :
                      'bg-red-200 text-red-600'
                    }`}>
                      {applicant.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <select 
                      value={applicant.status}
                      onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                      className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 
                      focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </section>
  );
};

export default JobApplicants;