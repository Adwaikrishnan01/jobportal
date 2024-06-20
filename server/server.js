import express from "express";
import morgan from 'morgan';
import dotenv from "dotenv"
import cors from 'cors'
import authRoute from './authRoute.js'
import passport from './passport-config.js';
import session from 'express-session';
import connectDB from "./dbconfig.js";
import bodyParser from 'body-parser';

const app = express();
dotenv.config();
connectDB()
const port = 3000;
app.use(cors());
app.use(express.json())
app.use(morgan('dev'));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.get('/', (req, res) => {
  res.send('Welcome to my server!'); 
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(authRoute)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 