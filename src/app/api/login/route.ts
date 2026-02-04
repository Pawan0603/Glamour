import { comparePassword, generateTokens } from "@/lib/auth/jwt";
import connectDB from "@/lib/connectDB";
import UserModel from "@/lib/models/user";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { email, password } = await req.json();

        if (!email || !password) return NextResponse.json({ error: "email and  password is required." }, { status: 400 });

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ error: "User not exist." })
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) return NextResponse.json({ error: "Invalid password." }, { status: 401 });

        const tokens = generateTokens({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        })

        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            isEmailVerified: user.isEmailVerified,
        }

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

        return NextResponse.json({
            user: userData,
            tokens,
            message: "Login successful",
        })
    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}