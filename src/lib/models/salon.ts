import mongoose, {Schema} from "mongoose";

interface IService {
    serviceName: string;
    category: string;
    price: number;
    duration: string;
}
interface IBarber {
    name: string;
    experience: number;
    services: string[];
}

interface ISalon {
    ownerId: mongoose.Schema.Types.ObjectId;
    name: string;
    category: "Men" | "Women" | "Unisex";
    description?: string;
    address: {
        city: string;
        area: string;
        pincode: number;
        fullAddress: string;
    };
    openingTime: string;
    closingTime: string;
    workingDays: string[];
    coverImage?: string;
    images: string[];
    phone: string;
    services: IService[];
    barbers: IBarber[];
}

const ServiceSchema = new Schema<IService>({
    serviceName: {
        type: String,
        required: [true, "service name is required."],
        trim: true
    },
    category: {
        type: String,
        required: [true, "service category is required."]
    },
    price: {
        type: Number,
        required: [true, "service price is required."]
    },
    duration: {
        type: String,
        required: [true, "service duration is required."]
    }
})

const BarberSchema = new Schema<IBarber>({
    name: {
        type: String,
        required: [true, "barber name is required."],
        trim: true
    },
    experience: {
        type: Number,
        default: 0,
    },
    services: [String]
})

const SalonSchema = new Schema<ISalon>({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "ownerId is required"]
    },
    name: {
        type: String,
        required: [true, "Salon name is required"],
        trim: true
    },
    category: {
        type: String,
        enum: ["Men", "Women", "Unisex"],
        required: [true, "Salon category is required"]
    },
    description: {
        type: String,
    },
    address: {
        city: String,
        area: String,
        pincode: Number,
        fullAddress: String
    },
    openingTime: {
        type: String,
        required: [true, "Opening Time is required."]
    },
    closingTime: {
        type: String,
        required: [true, "Closing time is required."]
    },
    workingDays: [String],
    coverImage: {
        type: String,
    },
    images: [String],
    phone: {
        type: String,
        required: [true, "Salon phone number is required"],
        trim: true
    },
    services: [ServiceSchema],
    barbers: [BarberSchema]

}, {timestamps: true});

const SalonModel = mongoose.models.Salon || mongoose.model("Salon", SalonSchema)

export default SalonModel;