import User from '../models/userModel.js';
import Job from '../models/jobModel.js'; 
import Application from '../models/applicationModel.js';
const adminController = {
  getUsers: async (req, res) => {
    try {
      // Pagination parameters
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 15;
      const skip = (page - 1) * limit;

      // Filtering
      const filter = {};
      if (req.query.role) filter.role = req.query.role;
      if (req.query.isAdmin) filter.isAdmin = req.query.isAdmin === 'true';

      // Sorting
      const sort = {};
      if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
      }

      // Fetch users
      const users = await User.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select('-password');  // Exclude password field

      // Get total count for pagination
      const total = await User.countDocuments(filter);

      res.status(200).json({
        users,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.isAdmin) {
        return res.status(403).json({ message: 'Cannot delete admin user' });
      }
      await Job.deleteMany({ createdBy: userId });
     
      await User.findByIdAndDelete(userId);

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  },

  deleteAdmin: async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      await Job.deleteMany({ createdBy: userId });
     
      await User.findByIdAndDelete(userId);

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  },

  getAllJobs: async (req, res) => {
    try {
      // Pagination parameters
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 15;
      const skip = (page - 1) * limit;

      // Filtering
      const filter = {};
      if (req.query.companyName) filter.companyName = new RegExp(req.query.companyName, 'i');
      if (req.query.location) filter.location = new RegExp(req.query.location, 'i');

      // Sorting
      const sort = {};
      if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
      }

      // Fetch jobs
      const jobs = await Job.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'name email');  

      const total = await Job.countDocuments(filter);

      res.status(200).json({
        jobs,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalJobs: total
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching jobs', error: error.message });
    }
  },

  deleteJob: async (req, res) => {
    try {
      const jobId = req.params.id;

      
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }

    
      await Job.findByIdAndDelete(jobId);

      res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting job', error: error.message });
    }
  },
  getUserStats:async (req, res) => {
    try {
      const stats = await User.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);
      const totalUsers = await User.countDocuments();

      const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get date 30 days ago
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Count users registered today
    const todayRegistrations = await User.countDocuments({
      createdAt: { $gte: today }
    });

    // Count users registered in the past month
    const pastMonthRegistrations = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.json({
      stats,
      otherStats:{
        totaluser:totalUsers,
        regToday:todayRegistrations,
        regPastMonth:pastMonthRegistrations
      }
    });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getJobStats: async (req, res) => {
    try {
      
      const stats = await Job.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);
  
      // Get total job count
      const totalJobs = await Job.countDocuments();
  
      // Get today's date
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      // Get date 30 days ago
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
      // Count jobs created today
      const todayJobs = await Job.countDocuments({
        createdAt: { $gte: today }
      });
  
      // Count jobs created in the past month
      const pastMonthJobs = await Job.countDocuments({
        createdAt: { $gte: thirtyDaysAgo }
      });
  
      res.json({
        stats,
        otherStats:{
        totalJobs:totalJobs,
        jobsToday:todayJobs,
        pastMonth:pastMonthJobs
      }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getApplicationStats : async (req, res) => {
    try {
      const stats = await Application.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 }
          }
        }
      ]);
      
      const formattedStats = {
        pending: 0,
        accepted: 0,
        rejected: 0
      };
  
      stats.forEach(stat => {
        formattedStats[stat._id] = stat.count;
      });
      const totalApplications=await Application.countDocuments()
      res.json({stats:formattedStats,count:totalApplications});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  changeRole: async (req, res) => {
    try {
      const userId = req.params.id
      console.log(userId)
   
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.role === 'admin') {
        return res.status(200).json({ message: 'User is already an admin' });
      }
  
      await User.findByIdAndUpdate(userId, { role: 'admin' });
  
      res.status(200).json({ message: 'User role updated to admin successfully' });
    } catch (error) {
      console.error('Error changing user role:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  searchUserByEmail : async (req, res) => {
    try {
      const { email } = req.query;
  
      if (!email) {
        return res.status(400).json({ message: 'Email is required for search' });
      }
  
      const user = await User.findOne({ email: email.toLowerCase() });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return user data (excluding sensitive information)
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
  
    } catch (error) {
      console.error('Error searching user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export default adminController;