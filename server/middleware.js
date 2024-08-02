import jwt from 'jsonwebtoken'

import userModel from './models/userModel.js';
import multer from 'multer'
import path from 'path'

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

  export const isAdmin = async (req, res, next) => {
    try {
    
      const userId = req.user.id;

      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.role !== 'admin' ) {
        return res.status(403).json({ message: 'Access denied. admin required.' });
      }

      req.admin = user;
      next();
    } catch (error) {
      console.error('Error in isadmin middleware:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 6 * 1024 * 1024,
  },
  fileFilter: function (req, file, cb) {
    console.log('File in fileFilter:', file);
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Allow only .pdf, .doc, .docx files!');
    }
  },
});

