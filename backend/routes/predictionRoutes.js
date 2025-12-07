// import express from "express";
// import Prediction from "../models/Prediction.js";
// import auth from "../middleware/auth.js";

// const router = express.Router();

// // ⭐ SAVE COMMENT
// router.post("/comment/:id", auth, async (req, res) => {
//   try {
//     const prediction = await Prediction.findById(req.params.id);
//     if (!prediction) return res.status(404).json({ message: "Prediction not found" });

//     prediction.comments.push({
//       user: req.user.id,
//       text: req.body.text,
//     });

//     await prediction.save();

//     // populate username
//     const updated = await Prediction.findById(req.params.id).populate("comments.user", "name");

//     res.json({ comments: updated.comments });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to add comment" });
//   }
// });

// export default router;

import express from "express";
import Prediction from "../models/Prediction.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ADD COMMENT
router.post("/comment/:id", auth, async (req, res) => {
  try {
    const { text } = req.body;
    const prediction = await Prediction.findById(req.params.id);

    if (!prediction)
      return res.status(404).json({ message: "Post not found" });

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
    console.error(err);
    res.status(500).json({ message: "Error adding comment" });
  }
});

export default router;
