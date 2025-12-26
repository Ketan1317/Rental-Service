import express from "express";
import {upload} from "../services/multer.service.js";
import authMiddleWare from "../middlewares/auth.js";
import rbac from "../middlewares/rbac.js";
import createProperty from "../controllers/userController/property.controller.js";

const propertyRouter = express.Router();

propertyRouter.post(
  "/create",
  authMiddleWare,
  rbac(["OWNER"]),
  upload.array("images", 10),
  createProperty
);

export default propertyRouter;
