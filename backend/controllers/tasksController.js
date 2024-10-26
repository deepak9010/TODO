// model import here
const tasksdata = require("../models/tasksModel");

const createTask = async (req, res) => {
  try {
    const { title, description, startTime, endTime, date, status,priority } = req.body;

    const newTask = new tasksdata({
      title,
      description,
      startTime,
      endTime,
      date: date || Math.floor(Date.now() / 1000),
      status: status || "pending",
      priority: priority || "medium",
    });


    const savedTask = await newTask.save();
    res.status(201).json({ message: "Task created successfully", data: savedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task: " + error.message });
  }
};

const editTask = async (req, res) => {
    try {
      const { id } = req.params; 
      const { title, description, startTime, endTime, date, status, priority } = req.body;
  
      const updatedTask = await tasksdata.findByIdAndUpdate(
        id,
        {
          title,
          description,
          startTime,
          endTime,
          date: date || Math.floor(Date.now() / 1000),
          status: status || "pending",
          priority: priority || "medium",
        },
        { new: true } 
      );
  
      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      res.status(200).json({ message: "Task updated successfully", data: updatedTask });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update task: " + error.message });
    }
  };

const getAllTasks = async (req, res) => {
    try {
      const tasks = await tasksdata.find(); 
      res.status(200).json({ message: "Tasks retrieved successfully", data: tasks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve tasks: " + error.message });
    }
  };

const getTaskById = async (req, res) => {
    try {
      const { id } = req.params; 
      const task = await tasksdata.findById(id); 
  
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      res.status(200).json({ message: "Task retrieved successfully", data: task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve task: " + error.message });
    }
  };

const deleteTask = async (req, res) => {
    try {
      const { id } = req.params; 
      const deletedTask = await tasksdata.findByIdAndDelete(id);
  
      if (!deletedTask) {
        return res.status(404).json({ error: "Task not found" }); 
      }
  
      res.status(200).json({ message: "Task deleted successfully", data: deletedTask });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete task: " + error.message });
    }
  };

const getCompletedCount = async (req, res) => {
    try {
      const completedCount = await tasksdata.countDocuments({ status: "completed" });   
      res.status(200).json({ message: "Completed task count retrieved successfully", completed_count: completedCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve completed task count: " + error.message });
    }
  };

const getPendingCount = async (req, res) => {
    try {
      const pendingCount = await tasksdata.countDocuments({ status: "pending" });   
      res.status(200).json({ message: "Pending task count retrieved successfully", pending_count: pendingCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve pending task count: " + error.message });
    }
  };

const getTasksByDate = async (req, res) => {
    try {
        const { date } = req.params; 
        // console.log("Received date parameter (epoch):", date);


      const targetDate = new Date(date * 1000);
      const startOfDay = new Date(targetDate.setUTCHours(0, 0, 0, 0)); 
      const endOfDay = new Date(targetDate.setUTCHours(23, 59, 59, 999)); 
  
     
    //   console.log("Start of day:", startOfDay);
    //   console.log("End of day:", endOfDay);
      
      const tasks = await tasksdata.find({
        date: { 
          $gte: Math.floor(startOfDay.getTime() / 1000), 
          $lt: Math.floor(endOfDay.getTime() / 1000) 
        }
      });
    
        res.status(200).json({ message: "Tasks fetched successfully", data: tasks });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve tasks by date: " + error.message });
      }
};

module.exports = { 
    createTask ,
    editTask, 
    getAllTasks, 
    getTaskById,
    deleteTask, 
    getCompletedCount,
    getPendingCount,
    getTasksByDate
};
