const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");

// Submit data
router.post("/submit", async (req, res) => {
  try {
    const data = new Submission(req.body);
    await data.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: "Submit failed" });
  }
});

// Get all submissions
router.get("/submissions", async (req, res) => {
  try {
    const data = await Submission.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// Delete by ID
router.delete("/submissions/:id", async (req, res) => {
  try {
    await Submission.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// Update by ID
router.put("/submissions/:id", async (req, res) => {
  try {
    await Submission.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;
