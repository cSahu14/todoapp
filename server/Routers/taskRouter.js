const express = require("express");
const { getTask, createTask, getAllTasks, deleteTask } = require("../Controllers/taskController");
const { protect } = require("../Middlewares/authMiddleware");

const router = express.Router();

router.get("/task/:id", protect, getTask);
router.get("/tasks", protect, getAllTasks);
router.post("/createTask", protect, createTask)
router.delete("/deleteTask/:id", protect, deleteTask);

module.exports = router;