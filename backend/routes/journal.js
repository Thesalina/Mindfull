import express from "express";
import Journal from "../models/Journal.js";

const router = express.Router();

/* ADD ENTRY */
router.post("/", async (req, res) => {
  const { mood, content, userId } = req.body;

  const entry = await Journal.create({
    mood,
    content,
    userId
  });

  res.json(entry);
});

/* GET ALL ENTRIES */
router.get("/:userId", async (req, res) => {
  const entries = await Journal.find({ userId: req.params.userId })
    .sort({ createdAt: -1 });

  res.json(entries);
});

/* DELETE ENTRY */
router.delete("/:id", async (req, res) => {
  await Journal.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
