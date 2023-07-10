const userModel = require("../models/user.model");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Register = async (req, res) => {
  const { name, email, password, address } = req.body;

  try {
    const ifUserExist = await userModel.findOne({ email });
    if (ifUserExist) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hash = bcrypt.hashSync(password, 8);
    const newUser = new userModel({ name, email, password: hash, address });
    await newUser.save();
    res
      .status(201)
      .json({ message: "user registerd successfully", data: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const ifUserExists = await userModel.findOne({ email });
    if (!ifUserExists) {
      return res.status(400).json({ message: "user doesn't exists" });
    } else {
      const result = await bcrypt.compare(password, ifUserExists.password);
      if (result) {
        const token = jwt.sign(
          { id: ifUserExists._id, email: ifUserExists.email },
          process.env.SECRET,
          { expiresIn: "7d" }
        );
        res.status(201).json({ message: "login successfully", token });
      } else {
        res.status(400).json({ message: "email or password do not match" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const Reset = async (req, res) => {
  const { currentPassword, changedPassword } = req.body;
  const { id } = req.params;
  try {
    const ifUserExist = await userModel.findOne({ _id: id });
    if (!ifUserExist) {
      return res.status(400).json({ message: "user doesn't exists" });
    } else {
      const result = await bcrypt.compare(
        currentPassword,
        ifUserExist.password
      );
      if (result) {
        const hash = bcrypt.hashSync(changedPassword, 8);
        const updatePassword = await userModel.findOneAndUpdate(
          { _id: id },
          { password: hash }
        );
        res.status(204).json({ message: "password reset successfully" });
      } else {
        res.status(400).json({ message: "password does not match" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { Register, Login, Reset };

/*


{
  "name": "gaurav",
  "email": "gaurav@gmail.com",
  "password": "1234",
  "address": {
    "street": "m-54 krishan vihar",
    "city": "delhi",
    "state": "delhi",
    "country": "India",
    "zip": "110086"
  }
}*/
