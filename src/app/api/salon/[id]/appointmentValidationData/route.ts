import { AuthenticatedRequest, withAuth } from "@/lib/auth/middleware";
import connectDB from "@/lib/connectDB";
import SalonModel from "@/lib/models/salon";
import { NextResponse } from "next/server";
import { RouteContext } from "@/lib/interfaces";

async function getappointmentValidationData(req: AuthenticatedRequest, context: RouteContext) {
    await connectDB();
    try {
        const { id } = await context.params;

        if (!id) return NextResponse.json({ error: "salonId was not found!" }, { status: 404 });

        const salon = await SalonModel.findById(id).select("_id salonName fullAddress city weeklyAvailabity services barber openingTime closingTime")

        if(!salon) return NextResponse.json({error: "Salon not found!"}, {status: 404});        

        return NextResponse.json({ success: true, data: salon }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error..." }, { status: 500 });
    }
}

export const GET = withAuth(getappointmentValidationData);