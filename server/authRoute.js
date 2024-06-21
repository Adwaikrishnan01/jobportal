import express from 'express';
import passport from './passport-config.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { login, register } from './controllers.js';
import { authenticateJWT } from './middleware.js';

dotenv.config();
const router=express.Router()

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
router.get('/protected', authenticateJWT, (req, res) => {
    res.status(200).json({ message: 'You have accessed a protected route' });
});



// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', 
    { failureRedirect: '/' ,successRedirect: '/protected-route-google'}), (req, res) => {

        res.redirect('/protected-route-google'); 
}); 

router.get('/protected-route-google', (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    res.status(200).json({
        message: 'You have accessed a protected route by Google login',
        id:user.id,
        name: user.name,
        email: user.email,
    });
});

export default router;

