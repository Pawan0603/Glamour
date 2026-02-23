import { type AuthenticatedRequest, withAuth } from "@/lib/auth/middleware";
import connectDB from "@/lib/connectDB";
import SalonModel from "@/lib/models/salon";
import UserModel from "@/lib/models/user";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary config (Server-side)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


async function registerSalon(req: AuthenticatedRequest){
    await connectDB();
    try {
        const data = await req.json();
        const user = req.user!;

        if(!user) return NextResponse.json({ error: "User not Authenticated."})

        if (!data) {
            return NextResponse.json({ error: "Data is missing." }, { status: 400 });
        }

        const isExistSalon = await SalonModel.findOne({ownerId: user.userId});

        if(isExistSalon) return NextResponse.json({error: "Salon is already exist with this user."}, {status: 409});

        const salon = new SalonModel({
            ...data,
            ownerId: user.userId
        })

        const updatedUser = await UserModel.findByIdAndUpdate(
            user.userId, 
            { role: "owner" },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        await salon.save();

        // changing image tag temp to permanent
        const allPublicIds = [data.coverPublicId, ...data.galleryPublicIds];

        if (allPublicIds.length > 0) {
            await cloudinary.uploader.replace_tag('permanent', allPublicIds);
        }

        return NextResponse.json({ message: "Salon registered successfully.", salon }, { status: 201 });        
    } catch (error) {
        return NextResponse.json({error: `Internal server error: ${error}`}, {status: 500})
    }
}

export const POST = withAuth(registerSalon)