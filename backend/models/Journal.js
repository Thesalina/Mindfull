import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  mood: Number,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Journal", journalSchema);
