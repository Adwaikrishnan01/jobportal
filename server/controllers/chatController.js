import { generateRoomId } from '../helper.js';
import Message from '../models/messageModel.js'
// In your route handler or controller
import Room from '../models/roomModel.js';
import User from "../models/userModel.js";

export const startChat = async (req, res) => {
  try {
    const { userId, selectedUserId } = req.body;
    console.log("currentsuerandother",userId,"  ",selectedUserId)

    // Validate user IDs
    if (!userId || !selectedUserId) {
      return res.status(400).json({ message: 'Both user IDs are required' });
    }

    // Check if both users exist
    const [currentUser, otherUser] = await Promise.all([
      User.findById(userId),
      User.findById(selectedUserId)
    ]);

    if (!currentUser || !otherUser) {
      return res.status(404).json({ message: 'One or both users not found' });
    }

    // Generate a unique room ID
    const roomId = generateRoomId(userId, selectedUserId);

    // Check if a room already exists
    let room = await Room.findOne({ roomId });

    if (!room) {
      // If room doesn't exist, create a new one
      room = new Room({
        roomId,
        participants: [userId, selectedUserId],
      });
      await room.save();
    } else {
      // If room exists, ensure both users are in the participants list
      if (!room.participants.includes(userId)) {
        room.participants.push(userId);
      }
      if (!room.participants.includes(selectedUserId)) {
        room.participants.push(selectedUserId);
      }
      await room.save();
    }

    // Return the room details
    res.json({
      roomId: room.roomId,
      participants: room.participants,
      createdAt: room.createdAt,
      lastMessage: room.lastMessage
    });

  } catch (error) {
    console.error('Error starting chat:', error);
    res.status(500).json({ message: 'Error starting chat', error: error.message });
  }
};


  export const getPreviousMessages=async (req, res) => {
    console.log("get message controller called")
    const { roomId } = req.params;
      try {
        const messages = await Message.find({ roomId })
          .sort({ createdAt: 1 }) 
          .limit(50); 

        res.status(200).json(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages', error: error.message });
      }
    };
    
  