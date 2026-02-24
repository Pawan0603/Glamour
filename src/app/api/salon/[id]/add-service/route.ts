import { AuthenticatedRequest, withOwnerAuth } from "@/lib/auth/middleware";
import connectDB from "@/lib/connectDB";
import { Service } from "@/lib/interfaces";
import SalonModel from "@/lib/models/salon";
import { NextResponse } from "next/server";

interface RouteContext {
    //   params?: Record<string, string | string[]>;
    params: Promise<{ id: string }>;
}

async function addServiceHandler(
    req: AuthenticatedRequest,
    context: RouteContext
) {
    await connectDB();

    try {
        const { id } = await context.params;
        console.log("⛳⛳this is salon id: ",id)
        const newService: Service = await req.json();

        const salon = await SalonModel.findById(id);

        if (!salon) NextResponse.json({ error: "Salon not found." }, { status: 404 });

        if (salon.ownerId.toString() !== req.user?.userId.toString()) {
            return NextResponse.json(
                { error: "Unauthorized: You do not own this salon" },
                { status: 403 }
            );
        }

        const updatedSalon = await SalonModel.findByIdAndUpdate(
            id,
            { $push: { services: newService } },
            {
                new: true,
                runValidators: true
            }
        );

        return NextResponse.json({ message: "Service added successfully.", services: updatedSalon.services }, { status: 200 });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}

export const PATCH = withOwnerAuth(addServiceHandler);