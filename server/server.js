import express from "express";
import morgan from 'morgan';
import dotenv from "dotenv"
import cors from 'cors'
import userRoute from './routes/userRoute.js'
import jobRoute from './routes/jobRoute.js'
import feedRoute from './routes/feedRoute.js'
import chatRoute from './routes/chatRoute.js'
import adminRoute from './routes/adminRoute.js'
import passport from './passport-config.js';
import session from 'express-session';
import connectDB from "./dbconfig.js";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import http from 'http';
import { Server } from 'socket.io';
import Message from './models/messageModel.js'

const app = express();
dotenv.config();
connectDB()
const port = 3000;
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ["GET", "POST"]
  }
});
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
app.use('/admin',adminRoute);

server.listen(port, () => {    
  console.log(`Server is running on port ${port}`); 
}); 

// Middleware to authenticate socket connections
io.use((socket, next) => {
  const userId = socket.handshake.auth.userId;
  if (!userId) {
    return next(new Error("invalid userId"));
  }
  socket.userId = userId;
  next();
});

io.on('connection', (socket) => {

  socket.on('join room', (roomId) => {
    console.log(`Socket ${socket.id} joining ${roomId}`);
    socket.join(roomId);
  });

  socket.on('send message', async (message) => {
    console.log('Message received:', message);
    try {
      const savedMessage = await Message.create(message);
      console.log('Message saved:', savedMessage);
      io.to(message.roomId).emit('new message', savedMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
app.use('/chat',chatRoute);