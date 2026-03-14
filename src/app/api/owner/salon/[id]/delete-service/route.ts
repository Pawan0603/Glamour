import { AuthenticatedRequest, withOwnerAuth } from "@/lib/auth/middleware";
import connectDB from "@/lib/connectDB";
import SalonModel from "@/lib/models/salon";
import { NextResponse } from "next/server";
import { RouteContext } from "@/lib/interfaces";

async function deleteServiceHandler(
    req: AuthenticatedRequest,
    context: RouteContext
) {
    await connectDB();

    try {
        const { id } = await context.params;
        // We get the serviceId from the URL query params or the request body
        // Example URL: /api/salon/[id]/delete-service?serviceId=123
        const { searchParams } = new URL(req.url);
        const serviceId = searchParams.get("serviceId");

        if (!serviceId) {
            return NextResponse.json({ error: "Service ID is required." }, { status: 400 });
        }

        const salon = await SalonModel.findById(id);

        if (!salon) {
            return NextResponse.json({ error: "Salon not found." }, { status: 404 });
        }

        // Authorization check
        if (salon.ownerId.toString() !== req.user?.userId.toString()) {
            return NextResponse.json(
                { error: "Unauthorized: You do not own this salon" },
                { status: 403 }
            );
        }

        // Remove the service using $pull
        const updatedSalon = await SalonModel.findByIdAndUpdate(
            id,
            { $pull: { services: { _id: serviceId } } },
            { new: true }
        );

        return NextResponse.json(
            { message: "Service deleted successfully.", services: updatedSalon.services },
            { status: 200 }
        );

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}

export const DELETE = withOwnerAuth(deleteServiceHandler);