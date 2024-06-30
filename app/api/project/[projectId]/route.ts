import connectToDB from "@/database";
import Projects from "@/models/Projects";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { projectId: string } }) => {
    try {
        await connectToDB()

        const project = await Projects.findById(params.projectId)

        if (!project) {
            return new NextResponse(JSON.stringify({ message: 'Project not found' }), { status: 404 })
        }

        return NextResponse.json({
            success: true,
            message: 'Project fetched successfully',
            project,
        }, { status: 200 });
    } catch (error) {
        console.log('[projectId_GET]', error)
        return new NextResponse('Internal Server error', { status: 500 })
    }
};

export async function PUT(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const data = await req.json();
        const project = await Projects.findByIdAndUpdate(id, data);
        if (project) {
            return NextResponse.json({
                success: true,
                message: "Project updated successfully",
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