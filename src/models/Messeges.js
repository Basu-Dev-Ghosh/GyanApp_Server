const mongoose = require("mongoose");
const MessegeSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  Email: {
    type: String,
  },
  Msg: {
    type: String,
  },
  
});

const Messege = new mongoose.model("Messege", MessegeSchema);
module.exports = Messege;
