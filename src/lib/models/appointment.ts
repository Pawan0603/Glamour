import mongoose, {Schema} from "mongoose";
import { IAppointment, Service } from "../interfaces";

const AppointmentServicesSchema = new Schema<Service>({
    servicesName: {
        type: String,
        required: [true, "Service name is required."]
    },
    price: {
        type: Number,
        required: [true, "Service price is required."]
    },
    category: {
        type: String,
        required: [true, "Service time is required."]
    },
    duration: {
        type: Number,
        required: [true, "Service duration is required."]
    }
})

const AppointmentSchema = new Schema<IAppointment>({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "customerId is required"]
    },
    customerName: {
        type: String,
        required: [true, "customer name is required"]
    },
    salonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Salon",
        required: [true, "salonId is required"]
    },
    salonName: {
        type: String,
        required: [true, "salonId is required"]
    },
    fullAddress: {
        type: String,
        required: [true, "fullAddress is required"]
    },
    city: {
        type: String,
        required: [true, "city is required."]
    },
    barberId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "barberId is required."]
    },
    barberName: {
        type: String,
        required: [true, "barberName is required"],
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
    duration: {
        type: Number,
        required: [true, "appointment duration is required."]
    },
    price: {
        type: Number,
        required: [true, "appointment price is required."]
    },
    services: [AppointmentServicesSchema],
    status: {
        type: String,
        enum: ["Scheduled", "Completed", "Cancelled", " Incomplete", "Reschedule"],
        default: "Scheduled"
    }
}, {timestamps: true});

const AppointmentModel = mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema)

export default AppointmentModel;
