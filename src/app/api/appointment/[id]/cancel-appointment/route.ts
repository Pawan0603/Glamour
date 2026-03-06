import { AuthenticatedRequest, withAuth } from "@/lib/auth/middleware";
import connectDB from "@/lib/connectDB";
import AppointmentModel from "@/lib/models/appointment";
import { NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{ id: string }>;
}

async function cancelAppointment(req: AuthenticatedRequest, context: RouteContext) {
    await connectDB();
    try {
        const user = req.user;
        const { id } = await context.params;

        if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });

        if (!id) return NextResponse.json({ success: false, error: "Appointment Id was not recived!" }, { status: 404 });

        const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
            id,
            { status: "Cancelled" },
            { new: true }
        );

        return NextResponse.json({ success: true, message: "Appointment was cancelled.", data: updatedAppointment }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error!" }, { status: 500 });
    }
}

export const PATCH = withAuth(cancelAppointment); 