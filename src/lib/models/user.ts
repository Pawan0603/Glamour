import mongoose, {type Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    role: "customer" | "owner",
    emailVerificationToken: string,
    isEmailVerified: boolean
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "plese use a valid email address"],
    },
    password: {
        type: String,
        required: [true, "password must be required"]
    },
    role: {
        type: String,
        enum: ["customer", "owner"],
        required: [true, "role must be required"],
        default: "customer"
    },
    emailVerificationToken: {
        type: String
    },
    isEmailVerified: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)

export default UserModel;