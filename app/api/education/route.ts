import connectToDB from "@/database";
import Education from "@/models/Education";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
    try {
        await connectToDB()
        const data = await req.json()
        const education = await Education.create(data)

        if (education) {
            return NextResponse.json({
                success: true,
                message: "Education added successfully",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong! Please try again",
            });
        }
    } catch (error) {
        console.log('[education_POST]', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
};

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB()
        const education = await Education.find()

        if (education) {
            return NextResponse.json({
                success: true,
                message: "Education fetched successfully",
                education,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong! Please try again",
            });
        }
    } catch (error) {
        console.log('[education_GET]', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
};

export async function DELETE(req: Request) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const education = await Education.findByIdAndDelete(id);
        if (education) {
            return NextResponse.json({
                success: true,
                message: "Education deleted successfully",
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
