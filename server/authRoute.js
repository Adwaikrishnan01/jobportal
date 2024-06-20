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
    { failureRedirect: '/' ,successRedirect: '/protected-route'}), (req, res) => {
// Successful authentication, issue JWT

    const token = jwt.sign({ sub: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
}); 


export default router;

