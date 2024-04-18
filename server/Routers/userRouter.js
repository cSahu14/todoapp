const express = require("express");
;
const { registerUser, loginUser, getMe } = require("../Controllers/userController");
const { protect } = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/createUser", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe)

module.exports = router;