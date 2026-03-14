import { AuthenticatedRequest, withOwnerAuth } from "@/lib/auth/middleware";
import connectDB from "@/lib/connectDB";
import { Barber } from "@/lib/interfaces";
import SalonModel from "@/lib/models/salon";
import { NextResponse } from "next/server";
import { RouteContext } from "@/lib/interfaces";

async function addServiceHandler(
    req: AuthenticatedRequest,
    context: RouteContext
) {
    await connectDB();

    try {
        const { id } = await context.params;
        const newBarber: Barber = await req.json();

        const salon = await SalonModel.findById(id);

        if (!salon) NextResponse.json({ error: "Salon not found." }, { status: 404 });

        const isDuplicate = salon.barber.some(
            (s: Barber) => s.barberName.toLowerCase() === newBarber.barberName.toLowerCase()
        );

        if (isDuplicate) {
            return NextResponse.json(
                { error: "A barber with this name already exists in your salon." },
                { status: 400 }
            );
        }

        if (salon.ownerId.toString() !== req.user?.userId.toString()) {
            return NextResponse.json(
                { error: "Unauthorized: You do not own this salon" },
                { status: 403 }
            );
        }

        const updatedSalon = await SalonModel.findByIdAndUpdate(
            id,
            { $push: { barber: newBarber } },
            {
                new: true,
                runValidators: true
            }
        );

        return NextResponse.json({ message: "Service added successfully.", barber: updatedSalon.barber }, { status: 200 });

    } catch (error: unknown) {
        console.log(error)
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}

export const PATCH = withOwnerAuth(addServiceHandler);