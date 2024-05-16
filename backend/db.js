require("dotenv").config();

const mongoose = require("mongoose");
try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("connected to mongodb");
} catch (error) {
  console.log("error in connecting to mongodb", error.message);
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 6,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
