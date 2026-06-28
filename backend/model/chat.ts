import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const chatModel = mongoose.model("Chat", chatSchema);

export default chatModel;