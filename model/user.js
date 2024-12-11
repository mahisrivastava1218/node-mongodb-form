import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGODB_URL);

const userSchema = mongoose.Schema({
    name : String,
    email: String,
    password: String,
    batch: Number
})
export default mongoose.model("user",userSchema)
