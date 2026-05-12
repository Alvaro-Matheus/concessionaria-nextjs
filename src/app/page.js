"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Carousel, Form, Row, Col } from "react-bootstrap";
import Navbar from "./components/Navbar";
import styles from "./page.module.css";

export default function Home() {

  const [carros, setCarros] = useState([]);
  const [banners, setBanners] = useState([]);
  const [lojas, setLojas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filtro, setFiltro] = useState({
    marca: "",
    ano: "",
    valor: "",
  });

  useEffect(() => {
    async function load() {
      const [c, b, l] = await Promise.all([
        fetch("/api/cars"),
        fetch("/api/banners"),
        fetch("/api/lojas"),
      ]);

      setCarros(await c.json());
      setBanners(await b.json());
      setLojas(await l.json());
      setLoading(false);
    }

    load();
  }, []);

  const formatar = (v) =>
    Number(v || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const getImg = (c) => c.imagens?.[0] || "/placeholder-car.png";

  const filtrados = carros.filter((c) =>
    (!filtro.marca ||
      c.marca
        ?.toLowerCase()
        .includes(filtro.marca.toLowerCase())) &&

    (!filtro.ano ||
      c.ano
        ?.toString()
        .includes(filtro.ano)) &&

    (!filtro.valor ||
      Number(c.valor) <= Number(filtro.valor)) &&

    !c.vendido
  );
  return (
    <>
      <Navbar />

      <div className={styles.container}>

        <div className={styles.bannerWrapper}>
          <Carousel
            fade
            indicators={false}
            controls={false}
            interval={3000}
            pause={false}
            className={styles.carousel}
          >
            {banners.map((b) => (
              <Carousel.Item key={b._id}>
                <img
                  src={b.imagem}
                  alt="Banner"
                  className={styles.banner}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        <h2 className={styles.title}>
          Lojas Oficiais
        </h2>

        <div className={styles.lojasWrapper}>
          <div className={styles.lojas}>
            {lojas.map((l) => (
              <div key={l._id} className={styles.lojaItem}>
                <img
                  src={l.imagem}
                  alt={l.nome}
                  className={styles.circle}
                />

                <span>{l.nome}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.filtersBox}>

          <div className={styles.filtersHeader}>
            <h2>Encontre seu carro ideal</h2>
            <p>Filtre por marca, ano e valor máximo</p>
          </div>

          <div className={styles.filtersGrid}>

            <div className={styles.filterItem}>
              <label>Marca</label>

              <Form.Control
                placeholder="Ex: BMW"
                onChange={(e) =>
                  setFiltro({
                    ...filtro,
                    marca: e.target.value,
                  })
                }
              />
            </div>

            <div className={styles.filterItem}>
              <label>Ano</label>

              <Form.Control
                placeholder="Ex: 2024"
                onChange={(e) =>
                  setFiltro({
                    ...filtro,
                    ano: e.target.value,
                  })
                }
              />
            </div>

            <div className={styles.filterItem}>
              <label>Valor Máximo</label>

              <Form.Control
                placeholder="Até R$ 300.000"
                onChange={(e) =>
                  setFiltro({
                    ...filtro,
                    valor: e.target.value,
                  })
                }
              />
            </div>

            <div className={styles.filterButtonArea}>
              <button
                className={styles.clearBtn}
                onClick={() =>
                  setFiltro({
                    marca: "",
                    ano: "",
                    valor: "",
                  })
                }
              >
                Limpar filtros
              </button>
            </div>

          </div>

        </div>
        <div className={styles.grid}>

          {filtrados.map((c) => {
            const id = c._id || c.id;

            return (
              <div key={id} className={styles.card}>

                <img
                  src={getImg(c)}
                  className={styles.image}
                  alt={c.nome}
                />

                <div className={styles.cardContent}>

                  <h3>{c.nome}</h3>

                  <div className={styles.info}>
                    <span>{c.marca}</span>
                    <span>{c.km} KM</span>
                    <span>{c.ano}</span>
                  </div>

                  <h2>{formatar(c.valor)}</h2>

                  <Link href={`/detalhes/${id}`}>
                    <button className={styles.btn}>
                      Ver detalhes
                    </button>
                  </Link>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </>
  );
}