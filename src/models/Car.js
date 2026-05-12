import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  nome: String,
  marca: String,
  modelo: String,
  valor: Number,
  ano: String,
  direcao: String,
  cambio: String,
  motor: String,
  cor: String,
  portas: Number,
  km: String,
  combustivel: String,

  imagens: [String],

  vendido: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Car || mongoose.model("Car", CarSchema);