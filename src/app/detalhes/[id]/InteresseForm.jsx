"use client";

import { useState } from "react";

import styles from "./detalhes.module.css";

export default function InteresseForm({
    carro,
}) {

    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
        mensagem: "",
    });

    const [loading, setLoading] =
        useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const enviar = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await fetch("/api/interesses", {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify({
                    ...form,
                    carroId:
                        carro._id || carro.id,
                    carroNome: carro.nome,
                }),
            });

            alert("Interesse enviado!");

            setForm({
                nome: "",
                email: "",
                telefone: "",
                mensagem: "",
            });

        } catch (err) {

            alert("Erro");

        } finally {

            setLoading(false);

        }

    };

    return (
        <form
            onSubmit={enviar}
            className={styles.interesseBox}
        >

            <h2>
                Tenho Interesse
            </h2>

            <input
                type="text"
                name="nome"
                placeholder="Seu nome"
                value={form.nome}
                onChange={handleChange}
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Seu email"
                value={form.email}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="telefone"
                placeholder="Telefone"
                value={form.telefone}
                onChange={handleChange}
                required
            />

            <textarea
                name="mensagem"
                placeholder="Mensagem"
                value={form.mensagem}
                onChange={handleChange}
            />

            <button
                type="submit"
                disabled={loading}
            >
                {loading
                    ? "Enviando..."
                    : "Enviar Interesse"}
            </button>

        </form>
    );
}