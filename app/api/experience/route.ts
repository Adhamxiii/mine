import connectToDB from "@/database";
import Experience from "@/models/Experience";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
    try {
        await connectToDB()
        const data = await req.json()
        const experience = await Experience.create(data)

        if (experience) {
            return NextResponse.json({
                success: true,
                message: "Experience added successfully",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong! Please try again",
            });
        }
    } catch (error) {
        console.log('[experience_POST]', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
};

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB()
        const experience = await Experience.find()

        if (experience) {
            return NextResponse.json({
                success: true,
                message: "Experience fetched successfully",
                experience,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong! Please try again",
            });
        }
    } catch (error) {
        console.log('[experience_GET]', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
};

export async function DELETE(req: Request) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const experience = await Experience.findByIdAndDelete(id);
        if (experience) {
            return NextResponse.json({
                success: true,
                message: "Experience deleted successfully",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong! Please try again",
            });
        }
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! Please try again",
        });
    }
}
