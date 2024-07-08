import mongoose from "mongoose";
import Jobs from "../models/jobModel.js";
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
      const jobPostings = await Jobs.find({}).populate('createdBy'); 
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
  