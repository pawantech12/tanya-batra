import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Skill from "@/app/models/Skill";

const categories = [
  "Backend Development",
  "Frontend Development",
  "Databases",
  "Tools & Infrastructure",
  "Additional Skills",
];

export async function GET() {
  try {
    await dbConnect();

    const skills = await Skill.find().sort({ createdAt: -1 });

    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching skills" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const { name, category, description } = await req.json();

    if (!name?.trim()) {
      return NextResponse.json(
        { message: "Skill name is required" },
        { status: 400 },
      );
    }

    if (!categories.includes(category)) {
      return NextResponse.json(
        { message: "Invalid skill category" },
        { status: 400 },
      );
    }

    if (!description?.trim()) {
      return NextResponse.json(
        { message: "Skill description is required" },
        { status: 400 },
      );
    }

    const skill = await Skill.create({
      name: name.trim(),
      category,
      description: description.trim(),
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating skill" },
      { status: 500 },
    );
  }
}
