import jwt from 'jsonwebtoken'

import userModel from './models/userModel.js';


const authMiddleware = async (req, res, next) => {
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
export default authMiddleware;


