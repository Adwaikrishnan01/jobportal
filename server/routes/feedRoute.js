import express from 'express';
import {authMiddleware} from '../middleware.js';
import { createFeedPosting, getAllFeedPostings } from '../controllers/feedController.js';

const router=express.Router()

router.post('/postfeed',authMiddleware,createFeedPosting);
router.get('/getallfeeds',getAllFeedPostings);

export default router;