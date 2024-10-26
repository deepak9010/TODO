const express = require("express");
const { createTask, editTask,getAllTasks,getTaskById,deleteTask,getCompletedCount , getPendingCount, getTasksByDate} = require('../controllers/tasksController');
const router = express.Router();



router.post("/create", createTask);
router.put("/edit/:id", editTask);
router.get("/tasks", getAllTasks);
router.get("/task/:id", getTaskById);
router.delete("/task/:id", deleteTask);
router.get("/completed-count", getCompletedCount);
router.get("/pending-count", getPendingCount);
router.get("/date/:date", getTasksByDate);
  
module.exports = router;