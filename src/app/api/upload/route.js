import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploadResponse = await cloudinary.uploader.upload(base64, {
      folder: "carros",
    });

    return NextResponse.json({
      url: uploadResponse.secure_url,
    });
  } catch (error) {

    return NextResponse.json(
      { error: "Erro upload" },
      { status: 500 }
    );
  }
}