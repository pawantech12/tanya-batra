import Skill from "@/app/models/Skill";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const categories = [
  "Backend Development",
  "Frontend Development",
  "Databases",
  "Tools & Infrastructure",
  "Additional Skills",
];

export async function PUT(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;
    const { name, category, description } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid skill ID" },
        { status: 400 },
      );
    }

    if (!name?.trim() || !description?.trim()) {
      return NextResponse.json(
        { message: "Name and description are required" },
        { status: 400 },
      );
    }

    if (!categories.includes(category)) {
      return NextResponse.json(
        { message: "Invalid skill category" },
        { status: 400 },
      );
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        category,
        description: description.trim(),
      },
      { new: true, runValidators: true },
    );

    if (!updatedSkill) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json(updatedSkill);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating skill" },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid skill ID" },
        { status: 400 },
      );
    }

    const deletedSkill = await Skill.findByIdAndDelete(id);

    if (!deletedSkill) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Skill deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting skill" },
      { status: 500 },
    );
  }
}
