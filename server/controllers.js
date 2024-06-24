import expressAsyncHandler from "express-async-handler";
import { hashpassword } from "./helper.js";
import userModel from "./userModel.js";
import passport from "./passport-config.js";
import jwt from 'jsonwebtoken';
import twilio from 'twilio';

//register
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const register = expressAsyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body
    const hashedpassword = await hashpassword(password)
    const user = await userModel.findOne({ email: req.body.email })
    if (!user) {

        await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verifications.create({ to: `+91 ${phone}`, channel: 'sms' });
        userModel.create({
            name,
            email,
            password: hashedpassword, 
            phone,
            phone_verified: false
        }).then((createdUser) => {
            res.status(201).json({
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email, 
                phone: createdUser.phone,
                phone_verified:createdUser.phone_verified,
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
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ user: { id: user._id, email: user.email }, token });
        });
    })(req, res, next);
};

//verify phoneno

export const verifyPhone=async (req, res) => {
    const { phone, code } = req.body;
    try {
        const verification = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verificationChecks
            .create({ to: `+91 ${phone}`, code: code });

        if (verification.status === 'approved') {
            await userModel.updateOne({ phone: phone }, { phone_verified: true });
            res.status(200).json({ message: 'Phone number verified' });
        } else {
            res.status(400).json({ message: 'Invalid verification code' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error verifying code', error: err });
    }
};


