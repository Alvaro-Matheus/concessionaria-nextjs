import mongoose from "mongoose";

const LojaSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },

        imagem: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Loja ||
    mongoose.model("Loja", LojaSchema);