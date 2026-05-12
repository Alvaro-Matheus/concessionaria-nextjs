import Navbar from "@/app/components/Navbar";
import styles from "./detalhes.module.css";
import InteresseForm from "./InteresseForm";

async function getCarro(id) {
    try {
        const baseUrl =
            process.env.NEXT_PUBLIC_SITE_URL ||
            "http://localhost:3000";

        const res = await fetch(
            `${baseUrl}/api/cars/${id}`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) {
            return null;
        }

        return res.json();

    } catch (err) {
        console.error(err);
        return null;
    }
}

export default async function Detalhes({ params }) {

    const { id } = await params;

    const carro = await getCarro(id);

    if (!carro) {
        return (
            <>
                <Navbar />

                <div className={styles.container}>
                    <h1>Carro não encontrado</h1>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className={styles.banner}>
                <h1>{carro.nome}</h1>
            </div>

            <div className={styles.container}>

                <div className={styles.gallery}>
                    {carro.imagens?.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`${carro.nome} ${index + 1}`}
                            className={styles.image}
                        />
                    ))}
                </div>

                <div className={styles.bottomSection}>

                    <div className={styles.info}>

                        <h2 className={styles.title}>
                            Detalhes
                        </h2>

                        <div className={styles.detailsGrid}>

                            <div className={styles.detailItem}>
                                <strong>Marca</strong>
                                <span>{carro.marca}</span>
                            </div>

                            <div className={styles.detailItem}>
                                <strong>Modelo</strong>
                                <span>{carro.modelo}</span>
                            </div>

                            <div className={styles.detailItem}>
                                <strong>Ano</strong>
                                <span>{carro.ano}</span>
                            </div>

                            <div className={styles.detailItem}>
                                <strong>Motor</strong>
                                <span>{carro.motor}</span>
                            </div>

                            <div className={styles.detailItem}>
                                <strong>KM</strong>
                                <span>{carro.km}</span>
                            </div>

                            <div className={styles.detailItem}>
                                <strong>Câmbio</strong>
                                <span>{carro.cambio}</span>
                            </div>

                            <div className={styles.detailItem}>
                                <strong>Cor</strong>
                                <span>{carro.cor}</span>
                            </div>

                            <div className={styles.detailItem}>
                                <strong>Combustível</strong>
                                <span>{carro.combustivel}</span>
                            </div>

                        </div>

                        <h2 className={styles.price}>
                            {Number(carro.valor).toLocaleString(
                                "pt-BR",
                                {
                                    style: "currency",
                                    currency: "BRL",
                                }
                            )}
                        </h2>

                    </div>

                    <InteresseForm carro={carro} />

                </div>

            </div>
        </>
    );
}