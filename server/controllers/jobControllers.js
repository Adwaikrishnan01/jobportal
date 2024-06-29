import jobModel from "../models/jobModel.js";
import userModel from "../models/userModel.js";
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
      
      const newJobPosting = new jobModel({
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
      const jobPostings = await jobModel.find({}).populate('createdBy'); 
      res.status(200).json(jobPostings);
    } catch (error) {
      console.error('Error fetching job postings:', error);
      res.status(500).json({ message: 'Error fetching job postings', error: error.message });
    }
  };

  