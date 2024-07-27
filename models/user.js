const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
   email: {
    type: String,
    require: true,
   },
   username: {
    type: String,
   
   },
   password: {
    type: String,
    require: true,
   },
   list: [
    {
  type:mongoose.Types.ObjectId,
  ref: "List",
   },
],
});

module.exports = mongoose.model("User", userSchema);