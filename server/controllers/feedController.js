import Feeds from "../models/feedModel.js";

export const createFeedPosting = async (req, res) => {
    try {
      const {
        feedTitle,
        feedDescription
      } = req.body;
  
      if (!feedTitle || !feedDescription) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      
      const newFeedPosting = new Feeds({
        feedTitle,
        feedDescription,
        createdBy: req.user.id 
      });
  
      await newFeedPosting.save();
  
      res.status(201).json({
        message: 'feed posting created successfully',
        feedPosting: newFeedPosting
      });
    } catch (error) {
      console.error('Error creating feed posting:', error);
      res.status(500).json({ message: 'Error creating feed posting', error: error.message });
    }
  };

  export const getAllFeedPostings = async (req, res) => {
    try {
      const feedPostings = await Feeds.find({}).populate({
        path: 'createdBy',
        select: 'name _id'
      }); 
      res.status(200).json(feedPostings);
    } catch (error) {
      console.error('Error fetching feed postings:', error);
      res.status(500).json({ message: 'Error fetching feed postings', error: error.message });
    }
  };