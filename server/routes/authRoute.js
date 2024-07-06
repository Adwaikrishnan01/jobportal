import express from 'express';
import passport from '../passport-config.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getCurrentUser, googleLogin, initialController, login, refreshToken, register, updateUserProfile, updateUserRoleToEmployer, verifyPhone, verifyPhoneRequest } from '../controllers/userControllers.js';
import {authMiddleware} from '../middleware.js';


dotenv.config();
const router=express.Router()
const jsonParser = express.json();
router.get('/signup', (req, res) => {
    res.render('signup');
});
router.post('/signup',register);

// Route to handle JWT login
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', login)

// Protected route with JWT
router.get('/protected', authMiddleware, (req, res) => { 
    res.status(200).json({ message: 'You have accessed a protected route' });
});

// Google OAuth routes
router.post('/auth/google/client', googleLogin); //client

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', 
    { failureRedirect: '/'}), (req, res) => {

        const accessToken = jwt.sign(
            { id: req.user.id, email: req.user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
          res.json({accessToken})
          
}); 

router.get('/currentuser',authMiddleware,getCurrentUser);

router.post('/refresh-token', express.json(), refreshToken);

router.post('/profile/changeuser',authMiddleware,updateUserRoleToEmployer)

router.put('/update/profile',authMiddleware,updateUserProfile);
//verify phoneno twilio
router.get('/verify', (req, res) => {
    res.render('verify');
});
router.post('/verifyrequest',authMiddleware, verifyPhoneRequest);
router.post('/verify',authMiddleware, verifyPhone);

router.put('/initial',authMiddleware,initialController) 
export default router;

