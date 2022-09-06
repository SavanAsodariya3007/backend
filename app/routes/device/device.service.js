import { Device } from "./device.model.js";

class DeviceService {
  async addNewDevice(name, user, description = "") {
    const newDevice = Device({
      name,
      description,
      userId: user._id,
    });
    await newDevice.save();
    return newDevice;
  }
  async getDeviceByUser(user) {
    const devices = await Device.find({ userId: user._id });
    return devices;
  }
}

const deviceService = new DeviceService();
export { deviceService };
