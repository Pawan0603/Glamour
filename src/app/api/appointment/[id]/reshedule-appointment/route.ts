import { AuthenticatedRequest, withAuth } from "@/lib/auth/middleware";
import connectDB from "@/lib/connectDB";
import AppointmentModel from "@/lib/models/appointment";
import { NextResponse } from "next/server";
import { RouteContext } from "@/lib/interfaces";

// get single appointe for reshedule appointment
async function getAppointment(req: AuthenticatedRequest, context: RouteContext) {
    await connectDB();
    try {
        const user = req.user;
        const { id } = await context.params;

        if (!user) return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });

        if (!id) return NextResponse.json({ success: false, error: "Appointment Id was not recived!" }, { status: 404 });

        const Appointment = await AppointmentModel.findById({ _id: id });

        if (!Appointment) return NextResponse.json({ success: false, error: "Appointment not found!" }, { status: 404 });

        if (Appointment.customerId.toString() !== user.userId) return NextResponse.json({ success: false, error: "You cannot authorize to access this appointment." }, { status: 409 })

        if (Appointment.status !== "Scheduled") return NextResponse.json({ success: false, error: `Appointment will be already ${Appointment.status}.` }, { status: 409 })

        return NextResponse.json({ success: true, message: "Appointment get successful.", data: Appointment }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error!" }, { status: 500 });
    }
}

// Reshedule appointment route
async function RescheduleAppointment(req: AuthenticatedRequest, context: RouteContext) {
    await connectDB();
    try {
        const user = req.user;
        const { id } = await context.params;
        const data = await req.json();

        if (!user) return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });

        if (!data) return NextResponse.json({ success: false, error: 'Data not found' }, { status: 404 });

        if (!id) return NextResponse.json({ success: false, error: "Appointment Id was not recived!" }, { status: 404 });

        const updatedAppointment = await AppointmentModel.findOneAndUpdate(
            { _id: id, customerId: user.userId },
            { 
                barberId: data.barberId,
                barberName: data.barberName,
                appointmentDate: data.appointmentDate,
                appointmentTime: data.appointmentTime,
                status: "Reschedule"
            },
            { new: true }
        );

        return NextResponse.json({ success: true, message: "Appointment was rescheduled.", data: updatedAppointment }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error!" }, { status: 500 });
    }
}

export const GET = withAuth(getAppointment);
export const PATCH = withAuth(RescheduleAppointment); 