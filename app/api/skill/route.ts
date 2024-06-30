import connectToDB from "@/database";
import Skills from "@/models/Skills";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (req: NextRequest) => {
    try {
        await connectToDB()
        const data = await req.json()
        const skill = await Skills.create(data)

        if (skill) {
            return NextResponse.json({
                success: true,
                message: "Skill added successfully",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong! Please try again",
            });
        }
    } catch (error) {
        console.log('[skill_POST]', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
};

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB()
        const skills = await Skills.find()

        if (skills) {
            return NextResponse.json({
                success: true,
                message: "Skills fetched successfully",
                skills,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong! Please try again",
            });
        }
    } catch (error) {
        console.log('[skill_GET]', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
};

export async function DELETE(req: Request) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const skill = await Skills.findByIdAndDelete(id);
        if (skill) {
            return NextResponse.json({
                success: true,
                message: "Skill deleted successfully",
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
