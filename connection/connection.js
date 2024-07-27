const mongoose = require("mongoose");

const connection = async (req, res) => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://srisaik809:saikrishna@cluster1.ii46gcv.mongodb.net/"
      )
      .then(() => {
        console.log("Connected");
      });
  } catch (error) {
    res.status(400).json({
      message: "Not Connected",
    });
  }
};
connection();
