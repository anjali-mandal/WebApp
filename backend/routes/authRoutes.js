const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile, 
} = require("../controllers/authController");

// Auth routes
router.post("/signup", registerUser);
router.post("/login", loginUser);

// Profile routes
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile); 

module.exports = router;
