import jwt from 'jsonwebtoken'

import userModel from './models/userModel.js';


export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const decoded= jwt.verify(token, process.env.JWT_SECRET)
             
         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            req.userId = decoded.id; 
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

export const isEmployer = async (req, res, next) => {
    try {
    
      const userId = req.user.id;

      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.role !== 'employer') {
        return res.status(403).json({ message: 'Access denied. Employer role required.' });
      }

      req.employer = user;
      next();
    } catch (error) {
      console.error('Error in isEmployer middleware:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };



