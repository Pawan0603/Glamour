import { AuthenticatedRequest, withOwnerAuth } from "@/lib/auth/middleware";
import connectDB from "@/lib/connectDB";
import AppointmentModel from "@/lib/models/appointment";
import { NextResponse } from "next/server";


async function getAppointments(req: AuthenticatedRequest){
    await connectDB();
    try {
        const user = req.user;

        if(!user) return NextResponse.json({success: false, error: "User not found!"}, {status: 404});

        const appointments = await AppointmentModel.find({salonId: user.salonId});

        if(!appointments) return NextResponse.json({error: "No appointments found for this salon"}, {status: 404})

        return NextResponse.json({success: true, message: "Appointment fond successfully.", data: appointments}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "Internal servel error!"}, {status: 500});
    }
}

export const GET = withOwnerAuth(getAppointments);