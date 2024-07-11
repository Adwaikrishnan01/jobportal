import express from "express";
import morgan from 'morgan';
import dotenv from "dotenv"
import cors from 'cors'
import userRoute from './routes/userRoute.js'
import jobRoute from './routes/jobRoute.js'
import feedRoute from './routes/feedRoute.js'
import chatRoute from './routes/chatRoute.js'
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
    origin: '*', // Replace with your frontend URL in production
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

server.listen(port, () => {    
  console.log(`Server is running on port ${port}`); 
}); 

// Middleware to authenticate socket connections
io.use((socket, next) => {
  const userId = socket.handshake.auth.userId;
  console.log("sockethandshake", socket.handshake);
  if (!userId) {
    return next(new Error("invalid userId"));
  }
  socket.userId = userId;
  next();
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.userId);

  // Join a room (could be a direct message room or a group chat room)
  socket.on('join room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.userId} joined room ${roomId}`);
  });

  // Listen for new messages
  socket.on('send message', async ({ roomId, message }) => {
    try {
      const newMessage = new Message({
        sender: socket.userId,
        room: roomId,
        content: message
      });
      await newMessage.save();

      // Broadcast the message to the room
      io.to(roomId).emit('new message', {
        sender: socket.userId,
        content: message,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.userId);
  });
});

app.use('/chat',chatRoute)