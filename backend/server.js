// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import multer from "multer";

// import { register, login } from "./controllers/authController.js";
// import { uploadAndPredict, getUserPredictions, getAllSharedPredictions } from "./controllers/predictionController.js";
// import authMiddleware from "./middleware/authMiddleware.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // static uploads folder
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const uploadsPath = path.join(__dirname, "uploads");
// app.use("/uploads", express.static(uploadsPath));

// // multer config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadsPath),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const name = `${Date.now()}_${Math.random().toString(36).slice(2,9)}${ext}`;
//     cb(null, name);
//   }
// });
// const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

// // Auth routes
// app.post("/api/auth/register", register);
// app.post("/api/auth/login", login);

// // Protected prediction route
// app.post("/api/predictions/upload", authMiddleware, upload.single("image"), uploadAndPredict);

// // Get user's predictions
// app.get("/api/predictions/user/:userId", authMiddleware, getUserPredictions);

// // Get all shared predictions for community
// app.get("/api/predictions/shared", getAllSharedPredictions);

// // Connect DB and start
// const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(PORT, () => console.log("Server running on", PORT));
//   })
//   .catch(err => {
//     console.error("MongoDB connection error:", err);
//   });

// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import multer from "multer";

// // Controllers
// import { register, login } from "./controllers/authController.js";
// import {
//   uploadAndPredict,
//   getUserPredictions,
//   getAllSharedPredictions,
//   addComment
// } from "./controllers/predictionController.js";

// // Chatbot Router
// import botRouter from "./routes/botRoute.js";

// // Middleware
// import authMiddleware from "./middleware/authMiddleware.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ------------------------------------------------------
// // 🗂 PATH FIX FOR ES MODULES
// // ------------------------------------------------------
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ------------------------------------------------------
// // 📁 STATIC UPLOADS FOLDER
// // ------------------------------------------------------
// const uploadsPath = path.join(__dirname, "uploads");
// app.use("/uploads", express.static(uploadsPath));

// // ------------------------------------------------------
// // 📤 MULTER FILE UPLOAD CONFIG
// // ------------------------------------------------------
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadsPath),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const name = `${Date.now()}_${Math.random().toString(36).slice(2, 9)}${ext}`;
//     cb(null, name);
//   }
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 } // 5MB
// });

// // ------------------------------------------------------
// // 🔐 AUTH ROUTES
// // ------------------------------------------------------
// app.post("/api/auth/register", register);
// app.post("/api/auth/login", login);

// // ------------------------------------------------------
// // 🧠 PREDICTION ROUTES
// // ------------------------------------------------------
// app.post(
//   "/api/predictions/upload",
//   authMiddleware,
//   upload.single("image"),
//   uploadAndPredict
// );

// app.get(
//   "/api/predictions/user/:userId",
//   authMiddleware,
//   getUserPredictions
// );

// app.get("/api/predictions/shared", getAllSharedPredictions);

// // ------------------------------------------------------
// // 💬 ADD COMMENT ROUTE
// // ------------------------------------------------------
// app.post(
//   "/api/predictions/comment/:id",
//   authMiddleware,
//   addComment
// );

// // ------------------------------------------------------
// // 🤖 CHATBOT ROUTE (NEW)
// // ------------------------------------------------------
// app.use("/api/bot", botRouter);

// // ------------------------------------------------------
// // 🌍 CONNECT TO MONGODB & START SERVER
// // ------------------------------------------------------
// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(PORT, () =>
//       console.log(`Server running on port ${PORT}`)
//     );
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

// Controllers
import { register, login } from "./controllers/authController.js";
import {
  uploadAndPredict,
  getUserPredictions,
  getAllSharedPredictions,
  addComment
} from "./controllers/predictionController.js";

// Chatbot Router (Correct File Path)
import botRouter from "./routes/botRoute.js";

// Middleware
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ------------------------------------------------------
// 🗂 PATH FIX FOR ES MODULES
// ------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------------------------------------------
// 📁 STATIC UPLOADS FOLDER
// ------------------------------------------------------
const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

// ------------------------------------------------------
// 📤 MULTER FILE UPLOAD CONFIG
// ------------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsPath),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 9)}${ext}`;
    cb(null, name);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// ------------------------------------------------------
// 🔐 AUTH ROUTES
// ------------------------------------------------------
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);

// ------------------------------------------------------
// 🧠 PREDICTION ROUTES
// ------------------------------------------------------
app.post(
  "/api/predictions/upload",
  authMiddleware,
  upload.single("image"),
  uploadAndPredict
);

app.get(
  "/api/predictions/user/:userId",
  authMiddleware,
  getUserPredictions
);

app.get("/api/predictions/shared", getAllSharedPredictions);

// ------------------------------------------------------
// 💬 COMMENT ROUTE
// ------------------------------------------------------
app.post(
  "/api/predictions/comment/:id",
  authMiddleware,
  addComment
);

// ------------------------------------------------------
// 🤖 CHATBOT ROUTE (NEW)
// ------------------------------------------------------
app.use("/api/bot", botRouter);

// ------------------------------------------------------
// 🌍 CONNECT TO MONGODB & START SERVER
// ------------------------------------------------------
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
