import { AuthenticatedRequest, withAuth } from "@/lib/auth/middleware";
import connectDB from "@/lib/connectDB";
import AppointmentModel from "@/lib/models/appointment";
import { NextResponse } from "next/server";

async function bookAppointment(req: AuthenticatedRequest) {
    await connectDB();
    try {
        const data = await req.json();
        if (!data) return NextResponse.json({ error: "Appointment data not recived!" }, { status: 404 });

        const appointment = new AppointmentModel({
            ...data,
        })

        await appointment.save();

        return NextResponse.json({ success: true, message: "Appointment booked successfully." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error..." }, { status: 500 });
    }
}

export const POST = withAuth(bookAppointment);