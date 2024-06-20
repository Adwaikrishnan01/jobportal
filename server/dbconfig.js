import mongoose from "mongoose"
import colors from "colors"

const connectDB=async()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to mongodb ${connect.connection.host}`.bgGreen.white)
    }
    catch(error){
        console.log(`Error ${error}`.bgRed.white)
    }
};
export default connectDB;

