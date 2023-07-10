const express = require("express");
const connection = require("./configs/db");
const userRoute = require("./routes/user.route");
const resturantRoute = require("./routes/resturant.route");
require("dotenv").config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;

//ROUTES
app.use("/", (req, res) => {
  return res.status(200).json({ message: "welcome to food restaurant server" });
});
app.use("/api", userRoute);
app.use("/api", resturantRoute);
app.listen(PORT, async () => {
  try {
    await connection();
    console.log("server is running at port ", PORT);
  } catch (error) {
    console.log(error);
  }
});
