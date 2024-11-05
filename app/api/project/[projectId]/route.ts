import connectToDB from "@/database";
import Projects from "@/models/Projects";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
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
    req: NextRequest,
    { params }: { params: { projectId: string } }
) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDB();
        const data = await req.json();

        console.log("Data received for update:", data);

        // Prepare the update data
        const updateData: {
            title: any;
            image: any;
            link: any;
            category: any;
            type: any;
            small_overview: any;
            company_name?: any;
            isPined?: any
        } = {
            title: data.title,
            image: data.image,
            link: data.link,
            category: data.category,
            type: data.type,
            small_overview: data.small_overview,
            isPined: data.isPined
        };

        // Include companyName only if the type is "company"
        if (data.type === "company") {
            updateData.company_name = data.company_name;
        }

        console.log("Update data:", updateData);

        const project = await Projects.findByIdAndUpdate(
            params.projectId,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (project) {
            console.log("Project updated:", project);
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
