"use client";

import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import Navbar from "@/app/components/Navbar";
import styles from "./desejo.module.css";

export default function DesejoPage() {

    const salvarDesejo = async (values, { resetForm }) => {

        try {

            const res = await fetch("/api/desejos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                throw new Error("Erro ao salvar desejo");
            }

            alert("Desejo enviado com sucesso!");

            resetForm();

        } catch (err) {
            alert("Erro ao enviar desejo");
        }
    };

    return (
        <>
            <Navbar />

            <div className={styles.hero}>

                <h1>
                    Não encontrou o carro ideal?
                </h1>

                <p>
                    Nós encontramos para você.
                </p>

            </div>

            <div className={styles.container}>

                <Formik
                    initialValues={{
                        nome: "",
                        email: "",
                        telefone: "",
                        cidade: "",

                        marca: "",
                        modelo: "",

                        anoMin: "",
                        anoMax: "",

                        cor: "",
                        combustivel: "",
                        cambio: "",

                        precoMax: "",
                        kmMax: "",

                        financiamento: false,
                        seminovo: false,
                        similares: false,
                        whatsapp: false,
                    }}
                    onSubmit={salvarDesejo}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                    }) => (

                        <Form
                            onSubmit={handleSubmit}
                            className={styles.form}
                        >

                            <h2 className={styles.title}>
                                Dados pessoais
                            </h2>

                            <div className={styles.grid}>

                                <Form.Group>
                                    <Form.Label>Nome completo</Form.Label>

                                    <Form.Control
                                        name="nome"
                                        value={values.nome}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Email</Form.Label>

                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Telefone</Form.Label>

                                    <Form.Control
                                        name="telefone"
                                        value={values.telefone}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Cidade</Form.Label>

                                    <Form.Control
                                        name="cidade"
                                        value={values.cidade}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                            </div>

                            <h2 className={styles.title}>
                                Carro desejado
                            </h2>

                            <div className={styles.grid}>

                                <Form.Group>
                                    <Form.Label>Marca</Form.Label>

                                    <Form.Control
                                        name="marca"
                                        value={values.marca}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Modelo</Form.Label>

                                    <Form.Control
                                        name="modelo"
                                        value={values.modelo}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Ano mínimo</Form.Label>

                                    <Form.Control
                                        type="number"
                                        name="anoMin"
                                        value={values.anoMin}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Ano máximo</Form.Label>

                                    <Form.Control
                                        type="number"
                                        name="anoMax"
                                        value={values.anoMax}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Cor</Form.Label>

                                    <Form.Control
                                        name="cor"
                                        value={values.cor}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Combustível</Form.Label>

                                    <Form.Control
                                        name="combustivel"
                                        value={values.combustivel}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Câmbio</Form.Label>

                                    <Form.Control
                                        name="cambio"
                                        value={values.cambio}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Preço máximo</Form.Label>

                                    <Form.Control
                                        type="number"
                                        name="precoMax"
                                        value={values.precoMax}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                            </div>

                            <div className={styles.checks}>

                                <Form.Check
                                    type="checkbox"
                                    label="Aceito veículos similares"
                                    name="similares"
                                    checked={values.similares}
                                    onChange={handleChange}
                                />

                                <Form.Check
                                    type="checkbox"
                                    label="Quero financiamento"
                                    name="financiamento"
                                    checked={values.financiamento}
                                    onChange={handleChange}
                                />

                                <Form.Check
                                    type="checkbox"
                                    label="Aceito seminovos"
                                    name="seminovo"
                                    checked={values.seminovo}
                                    onChange={handleChange}
                                />

                                <Form.Check
                                    type="checkbox"
                                    label="Receber novidades no WhatsApp"
                                    name="whatsapp"
                                    checked={values.whatsapp}
                                    onChange={handleChange}
                                />

                            </div>

                            <Button
                                type="submit"
                                className={styles.button}
                            >
                                Encontrar Meu Carro
                            </Button>

                        </Form>
                    )}
                </Formik>

            </div>
        </>
    );
}