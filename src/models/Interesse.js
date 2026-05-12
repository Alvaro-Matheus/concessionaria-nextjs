import mongoose from "mongoose";

const InteresseSchema = new mongoose.Schema({

    carroId: String,

    carroNome: String,

    nome: String,

    email: String,

    telefone: String,

    mensagem: String,

    createdAt: {
        type: Date,
        default: Date.now,
    },

});

export default mongoose.models.Interesse ||
    mongoose.model("Interesse", InteresseSchema);