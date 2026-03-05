import { AuthenticatedRequest, withAuth } from "@/lib/auth/middleware";
import { getBusySlots } from "@/lib/booking/getBusySlots";
import connectDB from "@/lib/connectDB";
import AppointmentModel from "@/lib/models/appointment";
import { NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{ id: string }>;
}

const mockdata = [
    {
        barberName: "Aman",
        appointmentTime: "10:00",
        duration: 60,
    },
    {
        barberName: "Aman",
        appointmentTime: "11:00",
        duration: 30,
    },
    {
        barberName: "Aman",
        appointmentTime: "12:00",
        duration: 90,
    },
    {
        barberName: "Rahul",
        appointmentTime: "10:30",
        duration: 60,
    },
    {
        barberName: "Rahul",
        appointmentTime: "12:00",
        duration: 60,
    },
    {
        barberName: "Rahul",
        appointmentTime: "13:00",
        duration: 120,
    },
    {
        barberName: "Sahil",
        appointmentTime: "09:00",
        duration: 45,
    },
    {
        barberName: "Sahil",
        appointmentTime: "10:00",
        duration: 60,
    },
];

async function getSlotTimeLine(req: AuthenticatedRequest, context: RouteContext) {
    await connectDB();
    try {
        const { id } = await context.params;
        // const date = await req.json();

        const { searchParams } = new URL(req.url);
        const date = searchParams.get("date");

        if (!id) return NextResponse.json({ error: "salonId was not found!" }, { status: 404 });

        const appointments = await AppointmentModel.find({ salonId: id, appointmentDate: date }).select("barberName appointmentTime duration");

        if (appointments.length === 0) {
            return NextResponse.json({ success: true, data: [] }, { status: 200 });
        }

        const busySlots = getBusySlots(appointments);

        return NextResponse.json({ success: true, data: busySlots }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error..." }, { status: 500 });
    }
}

export const GET = withAuth(getSlotTimeLine);