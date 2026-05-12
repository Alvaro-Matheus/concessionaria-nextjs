"use client";

import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Navbar from "@/app/components/Navbar";
import CarForm from "./components/CarForm";
import carrosValidator from "./validators/carrosValidator";

import styles from "./admin.module.css";

const uploadImage = async (file) => {
  if (!file) return "";

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Erro ao fazer upload");
  }

  const data = await res.json();

  return data.url;
};

export default function Page() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const salvar = async (values, { resetForm }) => {

    try {

      setLoading(true);

      const imagens = await Promise.all([
        uploadImage(values.imagem1),
        uploadImage(values.imagem2),
        uploadImage(values.imagem3),
      ]);

      const carro = {
        id: uuidv4(),

        nome: values.nome,
        marca: values.marca,
        modelo: values.modelo,

        valor: values.valor,
        ano: values.ano,
        motor: values.motor,

        km: values.km,
        cambio: values.cambio,
        cor: values.cor,
        combustivel: values.combustivel,

        imagens: imagens.filter(Boolean),

        vendido: false,

        createdAt: new Date().toISOString(),
      };

      const res = await fetch("/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carro),
      });

      if (!res.ok) {
        throw new Error("Erro ao salvar carro");
      }

      alert("Carro cadastrado com sucesso!");

      resetForm();

      router.push("/");

    } catch (err) {

      alert("Erro ao salvar carro");

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <Navbar />

      <div className={styles.container}>

        <div className={styles.header}>

          <h1 className={styles.title}>
            Cadastrar Carro
          </h1>

          <p className={styles.subtitle}>
            Adicione um novo veículo ao sistema
          </p>

        </div>
        <div className={styles.formWrapper}>

          <Formik
            initialValues={{
              nome: "",
              marca: "",
              modelo: "",
              valor: "",
              ano: "",
              motor: "",

              km: "",
              cambio: "",
              cor: "",
              combustivel: "",

              imagem1: null,
              imagem2: null,
              imagem3: null,
            }}
            validationSchema={carrosValidator}
            onSubmit={salvar}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              setFieldValue,
              errors,
              touched,
            }) => (

              <Form
                onSubmit={handleSubmit}
                className={styles.form}
              >

                <CarForm
                  values={values}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  errors={errors}
                  touched={touched}
                />

                <div className={styles.buttonGroup}>

                  <Button
                    type="submit"
                    disabled={loading}
                    className={styles.buttonPrimary}
                  >

                    {loading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                        />

                        <span className={styles.loadingText}>
                          Salvando...
                        </span>
                      </>
                    ) : (
                      "Salvar Carro"
                    )}

                  </Button>

                  <Link href="/" className={styles.linkButton}>

                    <Button className={styles.buttonSecondary}>
                      Voltar
                    </Button>

                  </Link>

                </div>

              </Form>

            )}
          </Formik>

        </div>

      </div>
    </>
  );
}