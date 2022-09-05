import express from "express";
import { body } from "express-validator";
import { deviceController } from "../controllers/DeviceController.js";

import { validate } from "../middlewares/validator.js";

export const deviceRouter = express.Router();

deviceRouter.get("/", deviceController.getAllDevices);
deviceRouter.post("/addNewDevice", deviceController.addNewDevice);
