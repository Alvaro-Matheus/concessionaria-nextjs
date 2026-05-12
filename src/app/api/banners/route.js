import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Banner from "@/models/Banner";

export async function GET() {
    try {
        await connectDB();

        const banners = await Banner.find();

        return NextResponse.json(banners);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        const banner = await Banner.create({
            imagem: body.imagem,
        });

        return NextResponse.json(banner);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}