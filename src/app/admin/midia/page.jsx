"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";
import styles from "./midia.module.css";

export default function MidiaAdmin() {

    const [banners, setBanners] = useState([]);
    const [lojas, setLojas] = useState([]);

    const [bannerFile, setBannerFile] = useState(null);

    const [lojaNome, setLojaNome] = useState("");
    const [lojaFile, setLojaFile] = useState(null);

    const [loadingBanner, setLoadingBanner] = useState(false);
    const [loadingLoja, setLoadingLoja] = useState(false);

    async function load() {

        try {

            const [b, l] = await Promise.all([
                fetch("/api/banners"),
                fetch("/api/lojas"),
            ]);

            setBanners(await b.json());
            setLojas(await l.json());

        } catch (err) {


        }

    }

    useEffect(() => {
        load();
    }, []);

    async function uploadImage(file) {

        if (!file) return "";

        const formData = new FormData();

        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            throw new Error("Erro upload");
        }

        const data = await res.json();

        return data.url;
    }

    async function addBanner() {

        try {

            if (!bannerFile) return;

            setLoadingBanner(true);

            const imageUrl = await uploadImage(
                bannerFile
            );

            await fetch("/api/banners", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    imagem: imageUrl,
                }),
            });

            setBannerFile(null);

            load();

        } catch (err) {


        } finally {

            setLoadingBanner(false);

        }

    }

    async function addLoja() {

        try {

            if (!lojaNome || !lojaFile) return;

            setLoadingLoja(true);

            const imageUrl = await uploadImage(
                lojaFile
            );

            await fetch("/api/lojas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: lojaNome,
                    imagem: imageUrl,
                }),
            });

            setLojaNome("");
            setLojaFile(null);

            load();

        } catch (err) {


        } finally {

            setLoadingLoja(false);

        }

    }

    async function deleteBanner(id) {

        await fetch(`/api/banners/${id}`, {
            method: "DELETE",
        });

        setBanners((prev) =>
            prev.filter((b) => b._id !== id)
        );

    }

    async function deleteLoja(id) {

        await fetch(`/api/lojas/${id}`, {
            method: "DELETE",
        });

        setLojas((prev) =>
            prev.filter((l) => l._id !== id)
        );

    }

    return (
        <>
            <Navbar />

            <div className={styles.container}>

                <h1 className={styles.title}>
                    Painel de Mídia
                </h1>

                <section className={styles.section}>

                    <h2>
                        Banners da Home
                    </h2>

                    <div className={styles.form}>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setBannerFile(
                                    e.target.files[0]
                                )
                            }
                        />

                        <button onClick={addBanner}>
                            {loadingBanner
                                ? "Enviando..."
                                : "Adicionar"}
                        </button>

                    </div>

                    <div className={styles.grid}>

                        {banners.map((b) => (

                            <div
                                key={b._id}
                                className={styles.card}
                            >

                                <img
                                    src={b.imagem}
                                    alt="Banner"
                                />

                                <button
                                    className={styles.delete}
                                    onClick={() =>
                                        deleteBanner(b._id)
                                    }
                                >
                                    Deletar
                                </button>

                            </div>

                        ))}

                    </div>

                </section>

                <section className={styles.section}>

                    <h2>
                        Lojas Oficiais
                    </h2>

                    <div className={styles.form}>

                        <input
                            type="text"
                            placeholder="Nome da loja"
                            value={lojaNome}
                            onChange={(e) =>
                                setLojaNome(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setLojaFile(
                                    e.target.files[0]
                                )
                            }
                        />

                        <button onClick={addLoja}>
                            {loadingLoja
                                ? "Enviando..."
                                : "Adicionar"}
                        </button>

                    </div>

                    <div className={styles.grid}>

                        {lojas.map((l) => (

                            <div
                                key={l._id}
                                className={styles.cardSmall}
                            >

                                <img
                                    src={l.imagem}
                                    alt={l.nome}
                                />

                                <p>
                                    {l.nome}
                                </p>

                                <button
                                    className={styles.delete}
                                    onClick={() =>
                                        deleteLoja(l._id)
                                    }
                                >
                                    Deletar
                                </button>

                            </div>

                        ))}

                    </div>

                </section>

            </div>
        </>
    );
}