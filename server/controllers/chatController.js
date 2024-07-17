import { generateRoomId } from '../helper.js';
import Message from '../models/messageModel.js'
import Room from '../models/roomModel.js';
import User from "../models/userModel.js";

export const startChat = async (req, res) => {
  try {
    const { userId, selectedUserId } = req.body;
    if (!userId || !selectedUserId) {
      return res.status(400).json({ message: 'Both user IDs are required' });
    }
    const [currentUser, otherUser] = await Promise.all([
      User.findById(userId),
      User.findById(selectedUserId)
    ]);

    if (!currentUser || !otherUser) {
      return res.status(404).json({ message: 'One or both users not found' });
    }

    const roomId = generateRoomId(userId, selectedUserId);
    let room = await Room.findOne({ roomId });

    if (!room) {
      
      room = new Room({
        roomId,
        participants: [userId, selectedUserId],
      });
      await room.save();
    } else {
      
      if (!room.participants.includes(userId)) {
        room.participants.push(userId);
      }
      if (!room.participants.includes(selectedUserId)) {
        room.participants.push(selectedUserId);
      }
      await room.save();
    }

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

  //get users

  export const getMessagedUsers = async (req, res) => {
    const userId = req.user._id;

    try {
      
      const userMessages = await Message.aggregate([
        {
          $match: {
            $or: [
              { sender: userId },
              { receiver: userId }
            ]
          }
        },
        {
          $group: {
            _id: null,
            chatPartners: {
              $addToSet: {
                $cond: [
                  { $eq: ['$sender', userId] },
                  '$receiver',
                  '$sender'
                ]
              }
            }
          }
        }
      ]);
  
      if (userMessages.length === 0) {
        return res.status(200).json([]);
      }
  
      const chatPartnerIds = userMessages[0].chatPartners;
  
      // Fetch user details for chat partners
      const users = await User.find(
        { _id: { $in: chatPartnerIds } },
        { name: 1, _id: 1 }
      ).lean();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching user chats:', error);
      res.status(500).json({ error: 'Failed to fetch user chats' });
    }
  };
    
  