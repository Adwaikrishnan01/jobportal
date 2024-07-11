import api from "../utils/AxiosConfig";
import { toast } from "react-toastify";
import axios from 'axios'
import { API_URL } from "../utils/API";

export const ApplyJobAction=async(jobId ) => {
  try {
    const response = await api.post(`/jobs/applyforjob/${jobId}`,{
    });

    toast.success('Application submitted successfully!');
  } catch (error) {
    console.error('Error applying for job:', error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || 'Failed to submit application. Please try again.');
  }
}

export const handleDownloadResume = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/downloadResume/${id}`);
    const { url } = response.data;
    window.open(url, '_blank');
  } catch (error) {
    console.error('Error downloading resume:', error);
    toast.info("Resume not provided by user")
  }
};