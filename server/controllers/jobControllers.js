import mongoose from "mongoose";
import Jobs from "../models/jobModel.js";
import User from "../models/userModel.js";
import JobApplication from '../models/applicationModel.js';
import Notification from "../models/notificationModel.js";
export const createJobPosting = async (req, res) => {
    try {
      const {
        jobTitle,
        companyName,
        requiredSkills,
        experience,
        location,
        jobDescription,
        salary
      } = req.body;
  
      if (!jobTitle || !companyName || !experience || !location || !jobDescription) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      
      const newJobPosting = new Jobs({
        jobTitle,
        companyName,
        requiredSkills: requiredSkills || [],
        experience: {
          min: experience.min,
          max: experience.max 
        },
        location,
        jobDescription,
        salary: salary || 'Not disclosed',
        createdBy: req.user.id 
      });
  
      await newJobPosting.save();
  
      res.status(201).json({
        message: 'Job posting created successfully',
        jobPosting: newJobPosting
      });
    } catch (error) {
      console.error('Error creating job posting:', error);
      res.status(500).json({ message: 'Error creating job posting', error: error.message });
    }
  };

  //get all jobs
  export const getAllJobPostings = async (req, res) => {
    try {
      const jobPostings = await Jobs.find({}).populate('createdBy','-password -age -resume -skills'); 
      res.status(200).json(jobPostings);
    } catch (error) {
      console.error('Error fetching job postings:', error);
      res.status(500).json({ message: 'Error fetching job postings', error: error.message });
    }
  };

  export const getJobsByEmployer = async (req, res) => {
    try {
      const userId = req.user.id;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
  
      const jobs = await Jobs.find({ createdBy: userId })
        .sort({ createdAt: -1 })
        .select('-__v')
        .lean();
      if (jobs.length === 0) {
       Jobs.find().select('jobTitle companyName createdBy').lean();
        return res.status(200).json({ message: 'No jobs found for this employer', jobs: [] });
      }
      res.status(200).json({
        message: 'Jobs retrieved successfully',
        count: jobs.length,
        jobs: jobs
      });
    } catch (error) {
      console.error('Error in getJobsByEmployer controller:', error);
      res.status(500).json({ message: 'Error retrieving jobs', error: error.message });
    }
  };

  //filter jobs

  export const filterJobs = async (req, res) => {
      try {
        const { locations, skills, minSalary, maxSalary, minExperience, maxExperience } = req.query;
    
        let filter = {};
    

        if (locations) {
          const locationArray = locations.split(',').map(loc => loc.trim());
          filter.location = { $in: locationArray.map(loc => new RegExp(loc, 'i')) };
        }
    
        if (skills) {
          const skillsArray = skills.split(',').map(skill => skill.trim());
          filter.requiredSkills = { $in: skillsArray.map(skill => new RegExp(skill, 'i')) };
        }

        if (minSalary || maxSalary) {
          filter.salary = {};
          if (minSalary) filter.salary.$gte = minSalary;
          if (maxSalary) filter.salary.$lte = maxSalary;
        }
   
        if (minExperience || maxExperience) {
          filter['experience.min'] = {};
          filter['experience.max'] = {};
          if (minExperience) filter['experience.min'].$lte = Number(minExperience);
          if (maxExperience) filter['experience.max'].$gte = Number(maxExperience);
        }
    
        console.log('Filter:', JSON.stringify(filter, null, 2));
    
        const jobs = await Jobs.find(filter);
    
        console.log(`Found ${jobs.length} jobs`);
        
        if (jobs.length === 0) {
          return res.status(404).json({ message: 'No jobs found matching the criteria' });
        }
    
        res.status(200).json(jobs);
      } catch (error) {
        console.error('Error filtering jobs:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });  
      }
    };

//apply for job
    
 export const applyForJob = async (req, res) => {
  try {
    const  jobId  = req.params.id;
    
    const userId = req.user.id;   
 
    const job = await Jobs.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const existingApplication = await JobApplication.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const employer = await User.findById(job.createdBy);
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    
    const newApplication = new JobApplication({
      job: jobId,
      applicant: userId,
      employer: employer._id,
      status: 'pending',
      resumeLink: req.user.resume 
    });

    await newApplication.save();

    res.status(201).json({ 
      message: 'Application submitted successfully', 
      application: newApplication 
    });

  } catch (error) {
    console.error('Error in applyForJob:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//get user job applications
export const getUserApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await JobApplication.find({ applicant: userId })
      .populate('job', 'jobTitle companyName location') 
      .populate('employer', 'companyName') 
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications
    });
  } catch (error) {
    console.error('Error in getUserApplications:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

//applicants for job

export const getJobApplicants = async (req, res) => {
  try {
    const { id } = req.params;
    const employerId = req.user.id; 
    const job = await Jobs.findOne({ _id: id, createdBy: employerId });
    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found or you do not have permission to view its applicants' 
      });
    }

    const applications = await JobApplication.find({ job: id })
      .populate('applicant', 'name email phone status _id')
      .sort({ createdAt: -1 }); 

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications.map(app => ({
        id:app._id,
        applicantId: app.applicant._id,
        applicantName: app.applicant.name,
        applicantEmail: app.applicant.email,
        applicantPhone: app.applicant.phone,
        status: app.status,
        appliedAt: app.createdAt,
      }))
    });

  } catch (error) {
    console.error('Error in getJobApplicants:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { status } = req.body;
    const employerId = req.user.id; 
  
    const validStatuses = ['pending', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const application = await JobApplication.findOne({ _id: id }).populate('job');
    
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.job.createdBy.toString() !== employerId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this application' });
    }

    application.status = status;
    await application.save();
    await Notification.create({
      userId: application.applicant._id,
      message: `Your application status for ${application.job.jobTitle} applied to 
      ${application.job.companyName} is ${status}.`
    });

    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      data: application
    });

  } catch (error) {
    console.error('Error in updateApplicationStatus:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

export const sendNotificationToUser=async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
}

export const deleteAllNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    
    await Notification.deleteMany({ userId });
    
    res.status(200).json({ message: 'All notifications deleted successfully' });
  } catch (error) {
    console.error('Error deleting notifications:', error);
    res.status(500).json({ message: 'Error deleting notifications', error: error.message });
  }
};