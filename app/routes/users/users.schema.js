import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full name not provided "],
        },
        email: {
            type: String,
            unique: [true, "Email already exists in database!"],
            lowercase: true,
            trim: true,
            required: [true, "Email not provided"],
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: "{VALUE} is not a valid email!",
            },
        },
        role: {
            type: String,
            enum: ["normal", "admin"],
            required: [true, "Please specify user role"],
        },
        password: {
            type: String,
            required: true,
        },
        devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Device" }],
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                delete ret.__v;
            },
        },
    }
);

const User = mongoose.model("User", userSchema);
export { User };
