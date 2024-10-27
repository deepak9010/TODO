const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


app.use(cors({
  origin : "*",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
}));

app.use(express.json());


// app.use(cors());

// import userRoute file means import APIS file
const pingRoute= require("./routes/pingRoute");
const taskRoute= require("./routes/tasksRoute");



// connect to mongodb database
mongoose.connect(process.env.URI)
.then(() => {
    console.log("Connected Successfully");
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log(err);
      console.log(`running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect", error)
  });

  
app.use(pingRoute);
app.use(taskRoute);







