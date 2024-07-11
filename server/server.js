import express from "express";
import morgan from 'morgan';
import dotenv from "dotenv"
import cors from 'cors'
import userRoute from './routes/userRoute.js'
import jobRoute from './routes/jobRoute.js'
import feedRoute from './routes/feedRoute.js'
import passport from './passport-config.js';
import session from 'express-session';
import connectDB from "./dbconfig.js";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'


const app = express();
dotenv.config();
connectDB()
const port = 3000;
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Welcome to my server!'); 
});

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(userRoute);
app.use('/jobs',jobRoute)
app.use('/feeds',feedRoute)
app.listen(port, () => {    
  console.log(`Server is running on port ${port}`); 
}); 