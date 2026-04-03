import connectDB from "@/lib/connectDB";
import SalonModel from "@/lib/models/salon";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connectDB();

    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = 6;
        const skip = (page - 1) * limit;
        let sortOption: any = { createdAt: -1 };

        const salons = await SalonModel.find({ featured: true })
            .select("_id salonName description city salonCoverImage rating salonCategory services openingTime closingTime weeklyAvailabity")
            .sort(sortOption)
            .skip(skip)
            .limit(limit)
            .lean();

        const totalSalons = await SalonModel.countDocuments({ Featured: true });

        return NextResponse.json({
            success: true,
            pagination: {
                total: totalSalons,
                pages: Math.ceil(totalSalons / limit),
                currentPage: page,
                limit
            },
            data: salons
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error!"}, {status: 500});
    }
}