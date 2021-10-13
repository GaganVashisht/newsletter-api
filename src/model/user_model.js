const mongoose = require("../db/mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [4, "name should contains minimum 4 letters "],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email is invalid");
    },
  },
  isVerified: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
