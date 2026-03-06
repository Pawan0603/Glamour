import { AuthenticatedRequest, withAuth } from "@/lib/auth/middleware";
import connectDB from "@/lib/connectDB";
import AppointmentModel from "@/lib/models/appointment";
import { NextResponse } from "next/server";


async function getAppointment(req: AuthenticatedRequest) {
    await connectDB();
    try {
        const user = req.user!;

        if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });

        const appointment = await AppointmentModel.find({ customerId: user.userId });

        return NextResponse.json(
            {
                success: true,
                message: "appointment get successfully.",
                data: appointment
            },
            {
                status: 200
            }
        )


    } catch (error) {
        return NextResponse.json({ error: "Internal server error!" }, { status: 500 });
    }
}

export const GET = withAuth(getAppointment);