import { AuthenticatedRequest, withAuth } from "@/lib/auth/middleware";
import { getBusySlots } from "@/lib/booking/getBusySlots";
import connectDB from "@/lib/connectDB";
import AppointmentModel from "@/lib/models/appointment";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

async function getSlotTimeLine(req: AuthenticatedRequest, context: RouteContext) {
  await connectDB();

  try {
    const { id } = await context.params;

    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!id) {
      return NextResponse.json(
        { error: "salonId was not found!" },
        { status: 404 }
      );
    }

    if (!date) {
      return NextResponse.json(
        { error: "date query param required" },
        { status: 400 }
      );
    }

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const appointments = await AppointmentModel.find({
      salonId: id,
      appointmentDate: {
        $gte: start,
        $lte: end,
      },
    }).select("barberName appointmentTime duration");
    
    if (appointments.length === 0) {
      return NextResponse.json({ success: true, data: [] }, { status: 200 });
    }

    const busySlots = getBusySlots(appointments);

    return NextResponse.json(
      { success: true, data: busySlots },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error..." },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getSlotTimeLine);