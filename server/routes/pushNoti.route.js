const express = require("express");
const User = require("../models/user.model");
const { sendPushNotification } = require("../services/notification.service");

const pushRouter = express.Router();

pushRouter.post("/notification", async (req, res) => {
  const user = await User.findOne({ pushSubscription: { $exists: true } });

  if (!user) {
    return res.status(404).json({ message: "No subscribed user found" });
  }

  const {mainTitle, body} = req.body;

  if(!mainTitle || !body){
    return res.status(400).json({message: "Title and body are required"});
  }

  await sendPushNotification(user.pushSubscription, {
    title: mainTitle,
    body: body,
  });

  res.json({ success: true });
});

module.exports = pushRouter;