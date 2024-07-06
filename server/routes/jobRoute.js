import express from 'express';
import { createJobPosting, filterJobs, getAllJobPostings, getJobsByEmployer } from '../controllers/jobcontrollers.js';
import {authMiddleware, isEmployer} from '../middleware.js';

const router=express.Router()

router.post('/postjob',authMiddleware,createJobPosting);
router.get('/getalljobs',getAllJobPostings);
router.get('/filter',filterJobs);
router.get('/getjobsbyemployer',authMiddleware,isEmployer,getJobsByEmployer);
export default router;