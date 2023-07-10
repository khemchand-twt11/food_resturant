const mongoose = require("mongoose");
require("dotenv").config();
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log("Error connecting to Database", error);
  }
};
module.exports = connection;
