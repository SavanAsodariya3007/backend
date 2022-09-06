import { User } from "../users/users.model.js";
import { Device } from "./device.model.js";

class DeviceService {
  async addNewDevice(name, user, description = "") {
    const newDevice = Device({
      name,
      description,
      userId: user._id,
    });
    const insertedRecord = await newDevice.save();
    const device_id = insertedRecord?._id;
    user.devices = user.devices || [];
    user.devices.push(device_id);
    user.save();
    return newDevice;
  }
  async getDeviceByUser(user) {
    const devices = await Device.find({ userId: user._id });
    return devices;
  }
}

const deviceService = new DeviceService();
export { deviceService };
