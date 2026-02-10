import { type AuthenticatedRequest, withAuth } from "@/lib/auth/middleware";
import connectDB from "@/lib/connectDB";
import SalonModel from "@/lib/models/salon";
import { NextResponse } from "next/server";


async function registerSalon(req: AuthenticatedRequest){
    await connectDB();
    try {
        const data = await req.json();
        const user = req.user!;

        if(!user) return NextResponse.json({ error: "User not Authenticated."})

        if (!data) {
            return NextResponse.json({ error: "Data is missing." }, { status: 400 });
        }

        const salon = new SalonModel({
            ...data,
            ownerId: user.userId
        })

        await salon.save();

        return NextResponse.json({ message: "Salon registered successfully.", salon }, { status: 201 });        
    } catch (error) {
        return NextResponse.json({error: `Internal server error: ${error}`}, {status: 500})
    }
}

export const POST = withAuth(registerSalon)