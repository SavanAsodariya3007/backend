import mongoose from "mongoose";
const Schema = mongoose.Schema;

const deviceSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "name is required!"],
        },
        description: {
            type: String,
            default: "this is device description",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Device = mongoose.model("Device", deviceSchema);
export { Device };
