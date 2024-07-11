
import { generateRoomId } from '../helper.js';
import Message from '../models/messageModel.js'
// In your route handler or controller


export const startChat=async(req, res) => {
  const { currentUserId, otherUserId } = req.body;
  const roomId = generateRoomId(currentUserId, otherUserId);
  res.json({ roomId });
};

export const getRoom=async (req, res) => {
    try {
      const messages = await Message.find({ room: req.params.roomId })
        .sort({ timestamp: 1 })
        .populate('sender', 'name'); // Assuming you want to include the sender's name
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching messages', error: error.message });
    }
  };