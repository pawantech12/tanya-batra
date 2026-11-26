import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Experience from "@/app/models/Experience";

export async function GET() {
  try {
    await dbConnect();

    const experiences = await Experience.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(experiences, { status: 200 });
  } catch (error) {
    console.error("GET Experience Error:", error);

    return NextResponse.json(
      { message: "Failed to fetch experiences" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const experience = await Experience.create(body);

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error("POST Experience Error:", error);

    return NextResponse.json(
      { message: "Failed to create experience" },
      { status: 500 },
    );
  }
}
