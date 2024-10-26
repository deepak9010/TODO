const mongoose = require("mongoose");


const tasksDataSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    date: {
      type: Number,
      default: () => Math.floor(Date.now() / 1000),
    },
    status: {
      type: String,
      enum: ["completed", "pending"], 
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"], 
      default: "medium", 
    },
  },
  { collection: "tasksdata" } 
);

const tasksdata = mongoose.model("tasksdata", tasksDataSchema);

module.exports = tasksdata;
