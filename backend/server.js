import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Test route */
app.get("/", (req, res) => {
  res.send("Mindfull backend running");
});

/* MongoDB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

/* Start server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
