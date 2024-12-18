import mongoose, { Schema } from "mongoose";

const waaaghSchema = new Schema({
    name: { required: true, type: String },
    warboss: { required: true, type: Schema.Types.ObjectId, ref: 'Orks' },
    location: { required: true, type: String },
    roster: [{ _id: false, type: Schema.Types.ObjectId, ref: 'Orks' }]
})

export default mongoose.model("WAAAGHs", waaaghSchema)