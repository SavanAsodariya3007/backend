import express from "express";
import { deviceController } from "./device.controller.js";

export const deviceRouter = express.Router();

deviceRouter.get("/", deviceController.getAllDevices);
deviceRouter.post("/addNewDevice", deviceController.addNewDevice);
