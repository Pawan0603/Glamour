import { AuthenticatedRequest, withOwnerAuth } from "@/lib/auth/middleware";
import connectDB from "@/lib/connectDB";
import SalonModel from "@/lib/models/salon";
import { NextResponse } from "next/server";
import { RouteContext } from "@/lib/interfaces";

async function deleteBarberHandler(
    req: AuthenticatedRequest,
    context: RouteContext
) {
    await connectDB();
    console.log("api runing....")
    try {
        const { id } = await context.params;
        const { searchParams } = new URL(req.url);
        const barberId = searchParams.get("barberId");
        
        if (!barberId) return NextResponse.json({ error: "Barber Id is required." }, { status: 400 });

        const updatedSalon = await SalonModel.findOneAndUpdate(
            {
                _id: id,
                ownerId: req.user?.userId
            },
            { $pull: { barber: { _id: barberId } } },
            {
                new: true,
                projection: { barber: 1 }
            }
        );
        if (!updatedSalon) {
            return NextResponse.json({
                error: "Salon not found or unauthorized access."
            }, { status: 404 });
        }

        return NextResponse.json({ message: "Barber deleted successfully.", barber: updatedSalon.barber }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}

export const DELETE = withOwnerAuth(deleteBarberHandler);