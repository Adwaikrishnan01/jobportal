
import express from 'express';
import {authMiddleware} from '../middleware.js';
import { getPreviousMessages, startChat } from '../controllers/chatController.js';


const router=express.Router()

router.post('/start-chat',startChat );


router.get('/messages/:roomId', getPreviousMessages);


export default router;
 
