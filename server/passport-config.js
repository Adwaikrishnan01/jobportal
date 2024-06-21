import passport from 'passport';
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
}, async function (accessToken, refreshToken, profile, done)  {
    // const existingUser = await userModel.findOne({ googleId: profile.id });
    // if (existingUser) {
    //     return done(null, existingUser);
    // }
    // const user = userModel.create({
    //     
    //     name: profile.displayName,
    //     emails: profile.emails,
    //     phone:"xxxxxxxxxx",
    //     password:"abc"      
    // });
    const user={id:profile.id,name:profile.displayName,email:profile.emails}
    done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {

    done(null, user);
});

export default passport;
