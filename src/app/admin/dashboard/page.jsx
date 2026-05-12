"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar"
import styles from "./dashboard.module.css";

export default function Dashboard() {

    const [carros, setCarros] = useState([]);

    const [interesses, setInteresses] = useState([]);

    const [loading, setLoading] = useState(true);

    async function loadData() {

        try {

            const [carsRes, interessesRes] = await Promise.all([
                fetch("/api/cars"),
                fetch("/api/interesses"),
            ]);

            const carsData = await carsRes.json();

            const interessesData = await interessesRes.json();

            setCarros(carsData);

            setInteresses(interessesData);

        } catch (err) {


        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {
        loadData();
    }, []);

    const deletarCarro = async (id) => {

        const confirmDelete = window.confirm(
            "Deseja deletar?"
        );

        if (!confirmDelete) return;

        await fetch(`/api/cars/${id}`, {
            method: "DELETE",
        });

        setCarros((prev) =>
            prev.filter((c) => (c._id || c.id) !== id)
        );
    };

    const formatarValor = (valor) => {

        return Number(valor).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL",
            }
        );

    };

    return (
        <>
            <Navbar />

            <div className={styles.container}>

                <h1>
                    Dashboard Admin
                </h1>

                <Link href="/admin">
                    <button className={styles.addButton}>
                        + Novo carro
                    </button>
                </Link>

                <h2 className={styles.sectionTitle}>
                    Carros
                </h2>

                <div className={styles.grid}>

                    {carros.map((carro) => {

                        const id =
                            carro._id || carro.id;

                        return (

                            <div
                                key={id}
                                className={styles.card}
                            >

                                <h3>{carro.nome}</h3>

                                <p>{carro.marca}</p>

                                <p>
                                    {formatarValor(
                                        carro.valor
                                    )}
                                </p>

                                <div className={styles.actions}>

                                    <Link href={`/admin/editar/${id}`}>
                                        <button className={styles.edit}>
                                            Editar
                                        </button>
                                    </Link>

                                    <button
                                        className={styles.delete}
                                        onClick={() =>
                                            deletarCarro(id)
                                        }
                                    >
                                        Deletar
                                    </button>

                                </div>

                            </div>

                        );

                    })}

                </div>

                <h2 className={styles.sectionTitle}>
                    Interesse dos Clientes
                </h2>

                <div className={styles.grid}>

                    {interesses.map((item) => (

                        <div
                            key={item._id}
                            className={styles.card}
                        >

                            <h3>{item.carroNome}</h3>

                            <p>
                                <strong>Cliente:</strong>
                                {" "}
                                {item.nome}
                            </p>

                            <p>
                                <strong>Email:</strong>
                                {" "}
                                {item.email}
                            </p>

                            <p>
                                <strong>Telefone:</strong>
                                {" "}
                                {item.telefone}
                            </p>

                            <p>
                                {item.mensagem}
                            </p>

                            <Link
                                href={`/detalhes/${item.carroId}`}
                            >
                                <button className={styles.edit}>
                                    Ver carro
                                </button>
                            </Link>

                        </div>

                    ))}

                </div>

            </div>
        </>
    );
}