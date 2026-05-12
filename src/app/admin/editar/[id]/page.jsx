"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Form, Button } from "react-bootstrap";
import Navbar from "@/app/components/Navbar";
import styles from "./editar.module.css";

export default function EditarCarro() {
    const router = useRouter();
    const { id } = useParams();

    const [carro, setCarro] = useState(null);

    useEffect(() => {
        async function loadCar() {
            const res = await fetch(`/api/cars/${id}`);
            const data = await res.json();
            setCarro(data);
        }

        if (id) loadCar();
    }, [id]);

    const handleChange = (e) => {
        setCarro({
            ...carro,
            [e.target.name]: e.target.value,
        });
    };

    const salvar = async () => {
        await fetch(`/api/cars/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(carro),
        });

        router.push("/admin/dashboard");
    };

    if (!carro) {
        return (
            <>
                <Navbar />

                <div className={styles.loading}>
                    Carregando...
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className={styles.container}>

                <div className={styles.card}>

                    <h2 className={styles.title}>
                        Editar Carro
                    </h2>

                    <Form>

                        <div className={styles.formGrid}>

                            <Form.Group className={styles.inputGroup}>
                                <Form.Label>Nome</Form.Label>

                                <Form.Control
                                    className={styles.input}
                                    name="nome"
                                    value={carro.nome || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className={styles.inputGroup}>
                                <Form.Label>Ano</Form.Label>

                                <Form.Control
                                    className={styles.input}
                                    name="ano"
                                    value={carro.ano || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className={styles.inputGroup}>
                                <Form.Label>Marca</Form.Label>

                                <Form.Control
                                    className={styles.input}
                                    name="marca"
                                    value={carro.marca || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className={styles.inputGroup}>
                                <Form.Label>Modelo</Form.Label>

                                <Form.Control
                                    className={styles.input}
                                    name="modelo"
                                    value={carro.modelo || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className={styles.inputGroup}>
                                <Form.Label>Valor</Form.Label>

                                <Form.Control
                                    className={styles.input}
                                    name="valor"
                                    value={carro.valor || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className={styles.inputGroup}>
                                <Form.Label>KM</Form.Label>

                                <Form.Control
                                    className={styles.input}
                                    name="km"
                                    value={carro.km || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className={styles.inputGroup}>
                                <Form.Label>Câmbio</Form.Label>

                                <Form.Control
                                    className={styles.input}
                                    name="cambio"
                                    value={carro.cambio || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className={styles.inputGroup}>
                                <Form.Label>Cor</Form.Label>

                                <Form.Control
                                    className={styles.input}
                                    name="cor"
                                    value={carro.cor || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className={styles.inputGroup}>
                                <Form.Label>Combustível</Form.Label>

                                <Form.Control
                                    className={styles.input}
                                    name="combustivel"
                                    value={carro.combustivel || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                        </div>

                        <div className={styles.buttonArea}>

                            <Button
                                className={styles.saveBtn}
                                onClick={salvar}
                            >
                                Salvar Alterações
                            </Button>

                            <Button
                                className={styles.backBtn}
                                onClick={() => router.push("/admin/dashboard")}
                            >
                                Voltar
                            </Button>

                        </div>

                    </Form>

                </div>

            </div>
        </>
    );
}