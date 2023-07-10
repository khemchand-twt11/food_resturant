const express = require("express");
const { Register, Login, Reset } = require("../controllers/user.controller");
const userRoute = express.Router();

userRoute.post("/register", Register);

userRoute.post("/login", Login);

userRoute.patch("/user/:id/reset", Reset);

module.exports = userRoute;
