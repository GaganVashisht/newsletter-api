const express = require("express");
const User = require("../model/user_model");
const mail = require("../utils/mail");

const router = express.Router();


router.post("/admin/sendFeed", async (req, res) => {

  const newsletter = req.body;
  console.log(newsletter);
  if (!newsletter.subject || !newsletter.body) {
    return res.status(404).send({
      status: "failure",
      message: "Please provide subject and body",
    });
  }
  
  const filter = { isVerified: true };
  try {
    const docList = await User.find(filter);
    
    
    const emails = docList.map((doc) => doc.email);
    await mail.sendToAll(newsletter, emails);
    res.json({
      stats: "success",
      message: "newletter sent",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;