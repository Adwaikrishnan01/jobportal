import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({
  feedTitle: {
    type: String,
    required: true,
    trim: true
  },
   feedDescription:{
    type:String,
    required:true,
    trim:true,
   },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("feeds", feedSchema);