import connectDB from "@/lib/connectDB";
import SalonModel from "@/lib/models/salon";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connectDB();

    try {
        const { searchParams } = new URL(req.url);
        const searchQuery = searchParams.get("query"); 
        const page = parseInt(searchParams.get("page") || "1");
        const limit = 12;
        const skip = (page - 1) * limit;

        let findQuery = {};
        let sortOption: any = { createdAt: -1 }; // Default: Newest first

        if (searchQuery && searchQuery.trim() !== "") {
            // Text search apply kar rahe hain
            findQuery = { $text: { $search: searchQuery } };
            
            // Relevance Score ke according sort kar rahe hain
            // Jisme sabse zyada keywords match honge, wo top par aayega
            sortOption = { score: { $meta: "textScore" } };
        }

        const salons = await SalonModel.find(findQuery, searchQuery ? { score: { $meta: "textScore" } } : {})
            .select("_id salonName description city salonCoverImage rating salonCategory")
            .sort(sortOption)
            .skip(skip)
            .limit(limit)
            .lean();

        const totalSalons = await SalonModel.countDocuments(findQuery);

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

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}