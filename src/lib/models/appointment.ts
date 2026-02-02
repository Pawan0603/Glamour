import mongoose, {type Document, Schema} from "mongoose";

export interface IAppointment extends Document {
    customerId: mongoose.Schema.Types.ObjectId;
    salonId: mongoose.Schema.Types.ObjectId;
    barberName: string;
    serviceName: string;
    appointmentDate: Date;
    appointmentTime: string;
    status: "Scheduled" | "Completed" | "Cancelled";
    createdAt: Date;
    updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "customerId is required"]
    },
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon",
        required: [true, "salonId is required"]
    },
    barberName: {
        type: String,
        required: [true, "barberName is required"],
        trim: true
    },
    serviceName: {
        type: String,
        required: [true, "serviceName is required"],
        trim: true
    },
    appointmentDate: {
        type: Date,
        required: [true, "appointmentDate is required"]
    },
    appointmentTime: {
        type: String,
        required: [true, "appointmentTime is required"]
    },
    status: {
        type: String,
        enum: ["Scheduled", "Completed", "Cancelled"],
        default: "Scheduled"
    }
}, {timestamps: true});

const AppointmentModel = mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema)

export default AppointmentModel;
