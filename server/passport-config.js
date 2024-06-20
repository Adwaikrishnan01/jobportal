import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv'
import userModel from './userModel.js';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt'

dotenv.config();

    if (!process.env.JWT_SECRET || !process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        throw new Error('Missing required environment variables');
    }
    

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const user = await userModel.findOne({ email: email });
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        } catch (err) {
            return done(err);
        }
    }
));
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, function (accessToken, refreshToken, profile, done)  {
    done(null, profile);
    console.log(profile)
           }
));

passport.serializeUser((profile, done) => {
    done(null, profile);
    console.log("serialiseduser",profile)   
});

passport.deserializeUser((profile, done) => {

    done(null, profile);
  
});

export default passport;
