const pingdata = require("../models/pingModel");


const ping = async (req, res) => {
  try {

    const pong = await pingdata.findOne();
    if (pong) {
      res.status(200).json({ message: "pong", data: pong });
    } else {
      res.status(200).json({ message: "pong", data: "No user data available" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database connection error: " + error.message });
  }

};

module.exports = { ping };



