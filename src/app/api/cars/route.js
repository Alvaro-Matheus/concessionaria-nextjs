import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  nome: String,
  marca: String,
  modelo: String,
  valor: String,
  ano: String,
  motor: String,

  km: String,
  cambio: String,
  cor: String,
  combustivel: String,

  imagens: Array,

  vendido: {
    type: Boolean,
    default: false,
  },

  createdAt: String,
});

const Car =
  mongoose.models.Car ||
  mongoose.model("Car", CarSchema);

export async function GET() {
  try {
    await connectDB();

    const carros = await Car.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(carros);

  } catch (err) {

    return NextResponse.json([], {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {

    const body = await req.json();

    await connectDB();

    const novoCarro = await Car.create({
      nome: body.nome,
      marca: body.marca,
      modelo: body.modelo,
      valor: body.valor,
      ano: body.ano,
      motor: body.motor,

      km: body.km,
      cambio: body.cambio,
      cor: body.cor,
      combustivel: body.combustivel,

      imagens: body.imagens || [],

      vendido: false,

      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(novoCarro);

  } catch (err) {

    return NextResponse.json(
      {
        error: "Erro ao salvar carro",
      },
      {
        status: 500,
      }
    );
  }
}