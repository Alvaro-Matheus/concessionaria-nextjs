import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Loja from "@/models/Loja";

export async function DELETE(req, context) {
    await connectDB();

    const { id } = await context.params;

    await Loja.findByIdAndDelete(id);

    return NextResponse.json({ ok: true });
}