const mongoose = require("mongoose");


const pingDataSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
  },
  { collection: "pingdata" }
 
);

const pingdata = mongoose.model("userdata", pingDataSchema);


module.exports = pingdata;
