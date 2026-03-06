import { AuthenticatedRequest, withOwnerAuth } from "@/lib/auth/middleware";
import connectDB from "@/lib/connectDB";
import AppointmentModel from "@/lib/models/appointment";
import SalonModel from "@/lib/models/salon";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


async function dashboardAnalysis(req: AuthenticatedRequest) {
  await connectDB();
  try {
    const user = req.user;

    if (!user) return NextResponse.json({ success: false, error: "User not found!" }, { status: 404 });

    const appointmentsCount = await AppointmentModel.countDocuments({ salonId: user.salonId });

    const salon = await SalonModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(user.salonId)} },
      {
        $project: {
          servicesCount: { $size: "$services" },
          barberCount: { $size: "$barber" }
        }
      }
    ]);

    const appointments = await AppointmentModel
      .find({ salonId: user.salonId })
      .sort({ createdAt: -1 }) // newest first
      .limit(5)
      .select("customerName services barberName appointmentTime status")
      .lean();

    const Revenue = await AppointmentModel.aggregate([
      {
        $match: { salonId: new mongoose.Types.ObjectId(user.salonId) }
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$price" }
        }
      }
    ]);

    const data = {
      appointmentsCount: appointmentsCount,
      servicesCount: salon[0]?.servicesCount || 0,
      barberCount: salon[0]?.barberCount || 0,
      revenue: Revenue[0]?.totalPrice || 0,
      appointments: appointments
    }

    return NextResponse.json({ success: true, message: "Updated analysis data.", data: data }, { status: 200 });
  } catch (error) {
    console.log("error: ",error)
    return NextResponse.json({ error: "Internal servel error!" }, { status: 500 });
  }
}

export const GET = withOwnerAuth(dashboardAnalysis);