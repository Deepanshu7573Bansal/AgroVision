// import mongoose from "mongoose";

// const predictionSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   imageUrl: { type: String, required: true }, // served path or full URL
//   model: { type: String, required: true },
//   disease: { type: String, required: true },
//   confidence: { type: Number, required: true }, // 0-100
//   share: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model("Prediction", predictionSchema);

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    user: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
    },
  },
  { timestamps: true }
);

const predictionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    imageUrl: { type: String, required: true },
    disease: { type: String, required: true },
    confidence: { type: Number, required: true },
    model: { type: String, required: true },

    // FIXED FIELD → must match controller
    share: { type: Boolean, default: false },

    // COMMENTS
    comments: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Prediction", predictionSchema);
