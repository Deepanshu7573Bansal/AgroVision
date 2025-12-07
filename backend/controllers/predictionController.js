// import path from "path";
// import Prediction from "../models/Prediction.js";
// import { runMockPrediction } from "../utils/predictMock.js";

// export const uploadAndPredict = async (req, res) => {
//   try {
//     // multer saved the file on req.file
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//     const model = req.body.model || "ResNet-50";
//     const share = req.body.share === "true" || req.body.share === true;

//     // Determine accessible image URL
//     const imageUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`;

//     // Mock prediction (replace with real model call)
//     const { disease, confidence } = runMockPrediction({ modelName: model, filename: req.file.filename });

//     // Save prediction
//     const pred = await Prediction.create({
//       userId: req.user.id,
//       imageUrl,
//       model,
//       disease,
//       confidence,
//       share
//     });

//     return res.json({ prediction: pred });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getUserPredictions = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const preds = await Prediction.find({ userId }).sort({ createdAt: -1 });
//     res.json({ predictions: preds });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getAllSharedPredictions = async (req, res) => {
//   try {
//     const all = await Prediction.find({ share: true }).populate("userId", "name").sort({ createdAt: -1 });
//     res.json({ predictions: all });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

import { exec } from "child_process";
import path from "path";
import Prediction from "../models/Prediction.js";

/**
 * 📌 1. UPLOAD IMAGE + RUN PYTHON MODEL
 */
export const uploadAndPredict = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No image uploaded" });

    const model = req.body.model;
    const share = req.body.share === "true";

    const imagePath = path.join("uploads", req.file.filename);

    // Run Python prediction script
    const command = `python predict.py --model="${model}" --image="${imagePath}"`;

    exec(command, async (error, stdout, stderr) => {
      if (error) {
        console.error("PYTHON ERROR:", stderr);
        return res.status(500).json({ message: "Prediction failed" });
      }

      let result;
      try {
        result = JSON.parse(stdout); // expect: { disease, confidence }
      } catch (err) {
        console.error("JSON parse error:", stdout);
        return res.status(500).json({ message: "Invalid Python output" });
      }

      // Save Prediction in DB
      const pred = await Prediction.create({
        userId: req.user.id,
        imageUrl: `${process.env.BASE_URL}/${imagePath}`,
        disease: result.disease,
        confidence: result.confidence,
        model,
        share,
      });

      res.json({ prediction: pred });
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * 📌 2. GET USER PREDICTIONS
 */
export const getUserPredictions = async (req, res) => {
  try {
    const userId = req.params.userId;

    const preds = await Prediction.find({ userId }).sort({ createdAt: -1 });

    res.json({ predictions: preds });
  } catch (err) {
    console.error("USER PREDICTIONS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * 📌 3. GET ALL SHARED PREDICTIONS (COMMUNITY)
 */
export const getAllSharedPredictions = async (req, res) => {
  try {
    const all = await Prediction.find({ share: true })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json({ predictions: all });
  } catch (err) {
    console.error("SHARED PREDICTIONS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * 📌 4. ADD COMMENT TO A PREDICTION  ⭐ REQUIRED FOR COMMUNITY
 */
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim())
      return res.status(400).json({ message: "Comment text required" });

    const prediction = await Prediction.findById(req.params.id);

    if (!prediction)
      return res.status(404).json({ message: "Prediction not found" });

    const newComment = {
      text,
      user: {
        _id: req.user.id,
        name: req.user.name,
      },
    };

    prediction.comments.push(newComment);
    await prediction.save();

    res.json({ message: "Comment added", comments: prediction.comments });

  } catch (err) {
    console.error("COMMENT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
