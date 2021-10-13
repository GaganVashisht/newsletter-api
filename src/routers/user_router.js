const express = require("express");
const router = new express.Router();
const User = require("../model/user_model");
const email = require("../utils/mail");
const cryptr = require("../utils/cryptr");

router.post("/user/subscribe", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    email.verifyemail(user.email, cryptr.encrypt(user.email));
    // console.log(cryptr.encrypt(user.email));
  } catch (err) {
    if (err.code === 11000) {
      return res.status(406).json({
        status: "failure",
        message: "User already exists, try with another email",
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
  res.json({
    status: "success",
    message: "A verification mail is sent to your email. Please verify.",
  });
});

router.get("/user/verify/:id", async (req, res) => {
  const verifiedEmail = cryptr.decrypt(req.params.id);
  const filter = { email: verifiedEmail };
  const update = { isVerified: true };
  const user = await User.findOneAndUpdate(filter, update);

  res.json({
    status: "successs",
    message: "User verified successfully",
  });
});

module.exports = router;
