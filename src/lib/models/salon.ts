import mongoose, { Schema } from "mongoose";
import { Salon, Coordinates, Barber, Service, IAvatar } from "../interfaces";

const avatarSchema = new Schema<IAvatar>({
    url: {
        type: String,
        required: [true, "Avatr url is required."],
    },
    publicId: {
        type: String,
        required: [true, "Avatr publicId is required."],
    },
})

const ServiceSchema = new Schema<Service>({
    servicesName: {
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
        type: Number,
        required: [true, "service duration is required."]
    }
})

const BarberSchema = new Schema<Barber>({
    barberName: {
        type: String,
        required: [true, "barber name is required."],
        trim: true
    },
    experience: {
        type: Number,
        default: 0,
    },
    services: [String],
    avatar: avatarSchema,
})

const CoordinatesSchema = new Schema<Coordinates>({
    lat: {
        type: Number,
        required: [true, 'Coordinate Latitude is required.']
    },
    lon: {
        type: Number,
        required: [true, 'Coordinate Longitude is required.']
    }
})

const SalonSchema = new Schema<Salon>({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "ownerId is required"]
    },
    salonName: {
        type: String,
        required: [true, "Salon name is required"],
        trim: true
    },
    salonCategory: {
        type: String,
        enum: ["Men", "Women", "Unisex"],
        required: [true, "Salon category is required"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Salon phone number is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Salon email is required."],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "plese use a valid email address"],
    },
    description: {
        type: String,
    },
    fullAddress: {
        type: String,
        required: [true, "Salon fullAddress is required."]
    },
    country: {
        type: String,
        required: [true, "Salon country is required."]
    },
    state: {
        type: String,
        required: [true, "State is required."]
    },
    city: {
        type: String,
        required: [true, "city is required."]
    },
    area_landmark: {
        type: String,
        required: [true, "area_landmark is required."]
    },
    pincode: {
        type: String,
        required: [true, "pincode is required."]
    },
    coordinate: CoordinatesSchema,


    openingTime: {
        type: String,
        required: [true, "Opening Time is required."]
    },
    closingTime: {
        type: String,
        required: [true, "Closing time is required."]
    },
    weeklyAvailabity: [String],
    salonCoverImage: {
        type: String,
    },
    salonImages: [String],
    profilePhoto: {
        type: String,
    },
    services: [ServiceSchema],
    barber: [BarberSchema],
    rating: {
        type: Number,
        default: 3.3,
    }

}, { timestamps: true });

SalonSchema.index({
    salonName: 'text',
    city: 'text',
    state: 'text',
    fullAddress: 'text',
    "services.servicesName": 'text'
}, {
    weights: {
        salonName: 10,
        "services.servicesName": 5,
        city: 3
    },
    name: "SalonSearchIndex"
});

const SalonModel = mongoose.models.Salon || mongoose.model("Salon", SalonSchema)

export default SalonModel;