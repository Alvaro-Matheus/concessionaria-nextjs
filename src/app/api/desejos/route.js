import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Desejo from "@/models/Desejo";

export async function GET() {

    try {

        await connectDB();

        const desejos = await Desejo
            .find()
            .sort({ createdAt: -1 });

        return NextResponse.json(desejos);

    } catch (err) {

        console.error(err);

        return NextResponse.json(
            { error: "Erro ao buscar desejos" },
            { status: 500 }
        );
    }
}

export async function POST(req) {

    try {

        await connectDB();

        const body = await req.json();

        const novoDesejo = await Desejo.create(body);

        return NextResponse.json(novoDesejo);

    } catch (err) {

        console.error(err);

        return NextResponse.json(
            { error: "Erro ao salvar desejo" },
            { status: 500 }
        );
    }
}