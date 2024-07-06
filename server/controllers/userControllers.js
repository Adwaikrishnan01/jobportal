import expressAsyncHandler from "express-async-handler";
import { hashpassword } from "../helper.js";
import userModel from "../models/userModel.js";
import passport from "../passport-config.js";
import jwt from 'jsonwebtoken';
import twilio from 'twilio';
import { OAuth2Client } from "google-auth-library";
//register
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const googleclient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const register = expressAsyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body
    const hashedpassword = await hashpassword(password)
    const user = await userModel.findOne({ email: req.body.email })
    if (!user) {
        userModel.create({
            name,
            email,
            password: hashedpassword, 
            phone,
            phone_verified: false,
            initial_login:true
        }).then((createdUser) => {
            res.status(201).json({
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email, 
                phone: createdUser.phone,
                phone_verified:createdUser.phone_verified,
                initial_login:createdUser.initial_login,
                success: true,
                message: "User Registerd Successfully",
            })   
        })
    } else {
        res.status(400);
        throw new Error("User already registerd or the email already in use")
    }
});

//login
export const login = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            console.error("Authentication error:", err, info);
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Login error', error: err });
            }
            const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '2d',
              });
            
              const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '7d',
              });
            
              res.json({
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: { id: user._id, name: user.name, email: user.email },
              });
        });
    })(req, res, next);
};
//verify request 

export const verifyPhoneRequest=async(req,res)=>{
  const {phone}=req.body
  console.log(phone)
  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  try {
    await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ to: `+91${phone}`, channel: 'sms' });
    
    res.status(200).json({ message: 'Verification request sent successfully' });
  } catch (error) {
    console.error("Error in Twilio verification:", error);
    res.status(500).json({ error: 'Failed to send verification request' });
  }
};

//verify phoneno

export const verifyPhone=async (req, res) => {
  const { code } = req.body;
  const userId = req.user.id;

  try {
      const user = await userModel.findById(userId);
      
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      const verification = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
          .verificationChecks
          .create({ to: `+91${user.phone}`, code: code });
      
      if (verification.status === 'approved') {
          try {
              user.phone_verified = true;
              await user.save();
              res.status(200).json({ message: 'Phone number verified successfully' });
          } catch (dbError) {
              console.error('Database update error:', dbError);
              res.status(500).json({ message: 'Error updating user in database', error: dbError.message });
          }
      } else {
          res.status(400).json({ message: 'Invalid verification code' });
      }
  } catch (err) {
      console.error('Verification error:', err);
      res.status(500).json({ message: 'Error during verification process', error: err.message });
  }
};
// get current user
export const getCurrentUser = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await userModel.findById(userId).select('-password');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error in getCurrentUser:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
// refresh token
export const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
  
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }
  
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await userModel.findById(decoded.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '2d',
      });
  
      const newRefreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
      });
  
      res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: { id: user._id, name: user.name, email: user.email },
      });
    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(403).json({ message: 'Invalid refresh token', error: error.message });
    }
  };

  export const googleLogin = async (req, res) => {
    const { sub: googleId, name, email } = req.body;
    console.log("user in controller", { googleId, name, email });
  
    try {
      
      let existingUser = await userModel.findOne({ googleId });
  
      if (!existingUser) {
        
        existingUser = new userModel({
          googleId,
          name,
          email,
        });
        await existingUser.save();
      }

      const appToken = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({
        message: 'User logged in successfully', 
        user: existingUser,
        accessToken: appToken,
        phone:"",
        phone_verified:false,
      });
    } catch (error) {
      console.error('Error logging in with Google:', error);
      res.status(500).json({ message: 'Error logging in with Google' });
    }
  };

  export const updateUserRoleToEmployer = async (req, res) => {
    const { companyName, companyRole } = req.body;
    console.log()
    const userId = req.user.id; 
  
    if (!companyName || !companyRole) {
      return res.status(400).json({ message: 'Company name and role are required' });
    }
  
    try {
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.role = 'employer';
      user.companyName = companyName;
      user.companyRole = companyRole;
      user.initial_login=false;
      await user.save();
  
      res.status(200).json({ message: 'User role updated to employer successfully', user });
    } catch (error) {
      console.error('Error updating user role:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  //update user profile

  export const updateUserProfile = async (req, res) => {
    try {
      const userId = req.user.id; 
      const { name, phone, skills, gender, age, experience } = req.body;
  
      // Find the user by ID and update
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        {
          name,
          phone,
          skills,
          gender,
          age,
          experience
        },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userResponse = updatedUser.toObject();
      delete userResponse.password;
  
      res.status(200).json({
        message: 'Profile updated successfully',
        user: userResponse
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
  };

  export const initialController=async(req,res)=>{
    try{
      const userId=req.user.id;
      const updatedUser=await userModel.findByIdAndUpdate(userId,{initial_login:false})
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({
        message: 'Profile updated successfully',
        user: updatedUser
      });
    }catch(error){
      console.log(error)
    }
  }