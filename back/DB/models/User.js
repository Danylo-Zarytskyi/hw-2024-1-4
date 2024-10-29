import { Schema, model } from "mongoose";

const userSchema = new Schema({
    nickname: String,
    description: String,
    age: Number
})

const User = model('User', userSchema);
export default User;