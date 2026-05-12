import { NextResponse } from "next/server";

import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";

const CarSchema = new mongoose.Schema({
    nome: String,
    marca: String,
    modelo: String,

    valor: Number,

    ano: String,

    motor: String,

    cambio: String,

    km: String,

    cor: String,

    combustivel: String,

    imagens: [String],

    vendido: {
        type: Boolean,
        default: false,
    },

    createdAt: String,
});

const Car =
    mongoose.models.Car ||
    mongoose.model("Car", CarSchema);

export async function GET(req, { params }) {

    try {

        await connectDB();

        const { id } = await params;

        const carro = await Car.findById(id);

        if (!carro) {

            return NextResponse.json(
                {
                    error: "Carro não encontrado",
                },
                {
                    status: 404,
                }
            );

        }

        return NextResponse.json(carro);

    } catch (err) {

        return NextResponse.json(
            {
                error: "Erro ao buscar carro",
            },
            {
                status: 500,
            }
        );

    }

}

export async function PUT(req, { params }) {

    try {

        await connectDB();

        const { id } = await params;

        const body = await req.json();

        const carroAtualizado =
            await Car.findByIdAndUpdate(
                id,
                body,
                {
                    new: true,
                }
            );

        return NextResponse.json(
            carroAtualizado
        );

    } catch (err) {

        return NextResponse.json(
            {
                error: "Erro ao atualizar carro",
            },
            {
                status: 500,
            }
        );

    }

}

export async function DELETE(req, { params }) {

    try {

        await connectDB();

        const { id } = await params;

        await Car.findByIdAndDelete(id);

        return NextResponse.json({
            message: "Carro deletado",
        });

    } catch (err) {

        return NextResponse.json(
            {
                error: "Erro ao deletar carro",
            },
            {
                status: 500,
            }
        );

    }

}