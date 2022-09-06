import { deviceService } from "./device.service.js";
class DeviceController {
  async getAllDevices(req, res) {
    const { user } = req.body;
    const devices = await deviceService.getDeviceByUser(user);
    res.handler.success(devices);
  }

  async addNewDevice(req, res) {
    try {
      const { user, name, description } = req.body;
      const newDevice = await deviceService.addNewDevice(
        name,
        user,
        description
      );
      res.handler.success(newDevice);
    } catch (error) {
      console.log("device.add error====>", error);
      res.handler.badRequest(undefined, error.message);
    }
  }
}

const deviceController = new DeviceController();
export { deviceController };
