import express from 'express';
import adminController from '../controllers/adminController.js';
import { authMiddleware, isAdmin } from '../middleware.js';

const router = express.Router();

router.get('/users',authMiddleware, isAdmin, adminController.getUsers);
router.get('/jobs',authMiddleware, isAdmin, adminController.getAllJobs);
router.delete('/user/delete/:id',authMiddleware, isAdmin, adminController.deleteUser);
router.delete('/job/delete/:id',authMiddleware, isAdmin, adminController.deleteJob);
router.get('/user-stats', authMiddleware, isAdmin, adminController.getUserStats);
router.get('/job-stats', authMiddleware, isAdmin, adminController.getJobStats);
router.get('/application-stats', authMiddleware, isAdmin, adminController.getApplicationStats);

export default router; 