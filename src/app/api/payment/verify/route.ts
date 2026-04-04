import connectDB from "@/lib/connectDB";
import AppointmentModel from "@/lib/models/appointment";
import crypto from "crypto";
import { NextResponse, type NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  connectDB();
  try {
    const body = await req.json();

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, salonId } = body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) return NextResponse.json({success: false, error: "Invalid signature"}, {status: 400});

    const appointment = await AppointmentModel.findOneAndUpdate(
      { _id: salonId },
      { $set: { status: "Scheduled" } },
      { new: true }
    );

    if (!appointment) return NextResponse.json({success: false, error: "Appointment not found"}, {status: 404});

    return NextResponse.json({success: true, message: "Payment verified and appointment scheduled successfully"}, {status: 200});

  } catch (error) {
    return NextResponse.json({success: false, error: "Internal server error"}, {status: 500});
  }
}