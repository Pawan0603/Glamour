import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary config (Server-side)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
    // Ye command "temporary" tag wali saari images delete kar degi
    const result = await cloudinary.api.delete_resources_by_tag('temporary');
    return NextResponse.json({ deleted: result });
}