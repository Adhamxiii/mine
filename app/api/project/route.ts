import connectToDB from "@/database";
import Projects from "@/models/Projects";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();
    const project = await Projects.create(data);

    if (project) {
      return NextResponse.json({
        success: true,
        message: "Project added successfully",
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

export async function GET(req: Request) {
  try {
    await connectToDB();
    const projects = await Projects.find();

    if (projects) {
      return NextResponse.json({
        success: true,
        message: "Projects fetched successfully",
        projects,
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




export async function DELETE(req: Request) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const project = await Projects.findByIdAndDelete(id);
    if (project) {
      return NextResponse.json({
        success: true,
        message: "Project deleted successfully",
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
