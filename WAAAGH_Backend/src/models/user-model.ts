import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: { required: true, type: String },
    password: { required: true, type: String },
    ork: { required: true, type: Schema.Types.ObjectId, ref: 'Orks' }
})

export default mongoose.model("Users", userSchema)