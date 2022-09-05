import { Device } from "./device.schema.js";

class DeviceController {
    async getAllDevices(req, res) {
        const { user } = req.body;
        const devices = await Device.find({ userId: user._id });

        res.handler.success(devices);
    }

    async addNewDevice(req, res) {
        try {
            const { user, name } = req.body;
            const newDevice = Device({
                name,
                userId: user._id,
            });
            await newDevice.save();
            res.handler.success(newDevice);
        } catch (error) {
            console.log("device.add error====>", error);
            res.handler.badRequest(undefined, error.message);
        }
    }
}

const deviceController = new DeviceController();
export { deviceController };
