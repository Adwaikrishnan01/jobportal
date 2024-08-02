import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    googleId: {
      type: String,
      
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; 
      },
    },
    phone: {
      type: String,
      
    },
    phone_verified: {
      type: Boolean,
     
    },
    initial_login:{
      type:Boolean
    },
    age: {
      type: Number,
      min: 0
    },
    skills: {
      type: [String],
      trim: true
    },
    experience: {
      type: Number,
      min: 0
    },
    gender: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      enum: ['employer', 'candidate'],
      default: 'candidate',
    },
    // Fields for employer
    companyName: {
      type: String,
      trim: true,
      required: function () {
        return this.role === 'employer';
      },
    },
    companyRole: {
      type: String,
      trim: true,
      required: function () {
        return this.role === 'employer';
      },
    },
    resume: {
      type: String, 
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);