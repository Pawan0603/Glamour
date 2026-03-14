import { AuthenticatedRequest, withOwnerAuth } from "@/lib/auth/middleware";
import connectDB from "@/lib/connectDB";
import SalonModel from "@/lib/models/salon";
import { NextResponse } from "next/server";
import { RouteContext } from "@/lib/interfaces";

async function getSalonHandler(req: AuthenticatedRequest, context: RouteContext) {
    await connectDB();

    try {
        const { id } = await context.params;

        const salon = await SalonModel.findById(id);

        if (!salon) NextResponse.json({ error: "Salon not found." }, { status: 404 });

        if (salon.ownerId.toString() !== req.user?.userId.toString()) {
            return NextResponse.json(
                { error: "Unauthorized: You do not own this salon" },
                { status: 403 }
            );
        }

        return NextResponse.json({ message: "Salon data fetch successfully.", salon }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}

export const GET = withOwnerAuth(getSalonHandler);