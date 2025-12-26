import express from "express";
import User from "../models/user.model.js";
import sendPushNotification from "../services/notification.service.js";

const pushRouter = express.Router();

pushRouter.post("/notification", async (req, res) => {
  const user = await User.findOne({ pushSubscription: { $exists: true } });

  if (!user) {
    return res.status(404).json({ message: "No subscribed user found" });
  }

  const { mainTitle, body } = req.body;

  if (!mainTitle || !body) {
    return res.status(400).json({ message: "Title and body are required" });
  }

  await sendPushNotification(user.pushSubscription, {
    title: mainTitle,
    body: body,
  });

  res.json({ success: true });
});

export default pushRouter;