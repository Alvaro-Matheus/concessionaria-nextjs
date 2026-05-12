import mongoose from "mongoose";

const DesejoSchema = new mongoose.Schema({
    nome: String,
    email: String,
    telefone: String,
    cidade: String,

    marca: String,
    modelo: String,

    anoMin: String,
    anoMax: String,

    cor: String,
    combustivel: String,
    cambio: String,

    precoMax: String,
    kmMax: String,

    financiamento: Boolean,
    seminovo: Boolean,
    similares: Boolean,
    whatsapp: Boolean,

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Desejo ||
    mongoose.model("Desejo", DesejoSchema);