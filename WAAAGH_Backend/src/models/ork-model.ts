import mongoose, { Schema } from "mongoose";

const orkSchema = new Schema({
    name: { required: true, type: String },
    role: { required: true, type: String },
    klan: { required: true, type: String },
    waaagh: { type: Schema.Types.ObjectId, ref: 'WAAAGHs' }
})

export default mongoose.model("Orks", orkSchema)