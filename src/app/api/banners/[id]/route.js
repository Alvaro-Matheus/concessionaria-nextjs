import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Banner from "@/models/Banner";

export async function DELETE(req, context) {
    await connectDB();

    const { id } = await context.params;

    await Banner.findByIdAndDelete(id);

    return NextResponse.json({ ok: true });
}