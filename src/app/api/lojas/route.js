import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Loja from "@/models/Loja";

export async function GET() {
    try {
        await connectDB();

        const lojas = await Loja.find();

        return NextResponse.json(lojas);
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

        const loja = await Loja.create({
            nome: body.nome,
            imagem: body.imagem,
        });

        return NextResponse.json(loja);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}