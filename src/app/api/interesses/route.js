import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Interesse from "@/models/Interesse";

export async function GET() {

    await connectDB();

    const interesses = await Interesse.find().sort({
        createdAt: -1,
    });

    return NextResponse.json(interesses);
}

export async function POST(req) {

    try {

        const body = await req.json();

        await connectDB();

        const interesse = await Interesse.create(body);

        return NextResponse.json(interesse);

    } catch (err) {

        return NextResponse.json(
            { error: "Erro ao salvar interesse" },
            { status: 500 }
        );

    }

}