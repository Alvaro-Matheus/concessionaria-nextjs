import * as Yup from "yup";

const carrosValidator = Yup.object({

  nome: Yup.string()
    .required("Nome obrigatório"),

  marca: Yup.string()
    .required("Marca obrigatória"),

  modelo: Yup.string()
    .required("Modelo obrigatório"),

  valor: Yup.number()
    .typeError("Valor inválido")
    .required("Valor obrigatório"),

  ano: Yup.number()
    .typeError("Ano inválido")
    .required("Ano obrigatório"),

  motor: Yup.string()
    .required("Motor obrigatório"),

  km: Yup.string()
    .required("KM obrigatório"),

  cambio: Yup.string()
    .required("Câmbio obrigatório"),

  cor: Yup.string()
    .required("Cor obrigatória"),

  combustivel: Yup.string()
    .required("Combustível obrigatório"),

  imagem1: Yup.mixed()
    .required("Imagem 1 obrigatória"),

  imagem2: Yup.mixed()
    .required("Imagem 2 obrigatória"),

  imagem3: Yup.mixed()
    .required("Imagem 3 obrigatória"),

});

export default carrosValidator;