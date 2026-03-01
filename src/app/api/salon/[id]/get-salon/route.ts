import connectDB from "@/lib/connectDB";
import SalonModel from "@/lib/models/salon";
import { NextResponse, type NextRequest } from "next/server";

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
    await connectDB();
    try {
        const { id } = await context.params;

        if(!id) return NextResponse.json({error: "salon id not recived."}, {status: 404});

        const salon = await SalonModel.findById(id);

        if(!salon) return NextResponse.json({error: "⚠️ Salon not found!"}, {status: 404})

        return NextResponse.json({success: true, data: salon}, {status: 200});
    } catch (error: unknown) {
         if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}