import express from 'express';
import { createJobPosting, getAllJobPostings } from '../controllers/jobcontrollers.js';
import authMiddleware from '../middleware.js';

const router=express.Router()

router.post('/postjob',authMiddleware,createJobPosting);
router.get('/getalljobs',getAllJobPostings);


export default router;