import { AuthenticatedRequest, withAuth } from "@/lib/auth/middleware";
import connectDB from "@/lib/connectDB";
import AppointmentModel from "@/lib/models/appointment";
import { NextResponse } from "next/server";

async function bookAppointment(req: AuthenticatedRequest) {
    await connectDB();
    try {
        const data = await req.json();
        if (!data) return NextResponse.json({ error: "Appointment data not recived!" }, { status: 404 });

        const now = new Date();

        // Check: same customer ka pending appointment already exists?
        const pendingAppointment = await AppointmentModel.findOne({
            salonId: data.salonId,
            barberId: data.barberId,
            appointmentDate: data.appointmentDate,
            appointmentTime: data.appointmentTime,
            customerId: data.customerId,
            status: "Pending",
        });

        if (pendingAppointment) {
            // PaymentExpire refresh karo — now + 12 mins
            const newExpiry = new Date(now.getTime() + 12 * 60 * 1000);
            pendingAppointment.paymentExpire = newExpiry;
            await pendingAppointment.save();

            return NextResponse.json({
                success: true,
                message: "Slot booked successfully.",
                data: { _id: pendingAppointment._id },
            }, { status: 200 });
        }

        // Check: koi aur already is slot pe booked hai?
        const existingAppointment = await AppointmentModel.findOne({
            salonId: data.salonId,
            barberId: data.barberId,
            appointmentDate: data.appointmentDate,
            appointmentTime: data.appointmentTime,
            $or: [
                { status: { $in: ["Scheduled", "Reschedule"] } },
                { status: "Pending", paymentExpire: { $gt: now } },
            ],
        });

        if (existingAppointment) {
            return NextResponse.json({ error: "Slot already booked for this time." }, { status: 400 });
        }

        // Naya appointment banao
        const appointment = new AppointmentModel({
            ...data,
            status: "Pending",
            paymentExpire: new Date(now.getTime() + 12 * 60 * 1000),
        });

        await appointment.save();

        return NextResponse.json({
            success: true,
            message: "Slot booked successfully.",
            data: { _id: appointment._id },
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Internal server error..." }, { status: 500 });
    }
}

export const POST = withAuth(bookAppointment);