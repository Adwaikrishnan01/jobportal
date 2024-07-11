import express from 'express';
import {
    applyForJob, createJobPosting, filterJobs,
    getAllJobPostings, getJobApplicants, getJobsByEmployer,
    getUserApplications,
    updateApplicationStatus
} from '../controllers/jobControllers.js';
import { authMiddleware, isEmployer } from '../middleware.js';

const router = express.Router()

router.post('/postjob', authMiddleware, createJobPosting);
router.get('/getalljobs', getAllJobPostings);
router.get('/filter', filterJobs);
router.get('/getjobsbyemployer', authMiddleware, isEmployer, getJobsByEmployer);
router.post('/applyforjob/:id', authMiddleware, applyForJob)
router.get('/getjobsbyuser', authMiddleware, getUserApplications)
router.get('/getapplicantsforjob/:id', authMiddleware, getJobApplicants)
router.patch('/applications/status/:id', authMiddleware, updateApplicationStatus);
export default router;