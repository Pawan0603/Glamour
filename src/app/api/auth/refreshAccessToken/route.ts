import { generateTokens } from "@/lib/auth/jwt";
import { NextResponse } from "next/server";
import { AuthenticatedRequest, withAuth } from "@/lib/auth/middleware";
import connectDB from "@/lib/connectDB";
import UserModel from "@/lib/models/user";
import { cookies } from "next/headers";

async function refreshAccessToken(req: AuthenticatedRequest) {
    await connectDB();
    try {
        const user = req.user;

        if(!user) NextResponse.json({error: "user not found"}, {status: 404})
        
        const USER = await UserModel.findById(user?.userId);

        if(!USER) NextResponse.json({error: "user not found"}, {status: 404})

        const tokens = generateTokens({
            userId: USER._id.toString(),
            email: USER.email,
            name: USER.name,
            role: USER.role,
            ...(USER.salonId && { salonId: USER.salonId })
        })

        const cookieStore = await cookies()
        cookieStore.set("accessToken", tokens.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: '/',
        })
        cookieStore.set("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: '/',
        })

        return NextResponse.json({ success: true }, {status: 200});
    } catch (error) {
        return NextResponse.json({ message: "Invalid token" }, { status: 500 });
    }
}

export const POST = withAuth(refreshAccessToken);