import Navbar from "@/app/components/Navbar";
import styles from "./desejos.module.css";

import { connectDB } from "@/lib/mongodb";
import Desejo from "@/models/Desejo";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getDesejos() {

    const res = await fetch(
        "http://localhost:3000/api/desejos",
        {
            cache: "no-store",
        }
    );

    return res.json();
}

async function deletarDesejo(formData) {
    "use server";

    const id = formData.get("id");

    await connectDB();
    await Desejo.findByIdAndDelete(id);
    revalidatePath("/admin/desejos");
    redirect("/admin/desejos");
}

export default async function DesejosAdmin() {

    const desejos = await getDesejos();

    return (
        <>
            <Navbar />

            <div className={styles.container}>

                <h1 className={styles.title}>
                    Desejos dos Clientes
                </h1>

                <div className={styles.grid}>

                    {desejos.map((item) => (

                        <div
                            key={item._id}
                            className={styles.card}
                        >

                            <h2>
                                {item.nome}
                            </h2>

                            <p>
                                <strong>Email:</strong> {item.email}
                            </p>

                            <p>
                                <strong>Telefone:</strong> {item.telefone}
                            </p>

                            <p>
                                <strong>Carro:</strong> {item.marca} {item.modelo}
                            </p>

                            <p>
                                <strong>Ano:</strong> {item.anoMin} - {item.anoMax}
                            </p>

                            <p>
                                <strong>Cor:</strong> {item.cor}
                            </p>

                            <p>
                                <strong>Câmbio:</strong> {item.cambio}
                            </p>

                            <p>
                                <strong>Combustível:</strong> {item.combustivel}
                            </p>

                            <form action={deletarDesejo}>

                                <input
                                    type="hidden"
                                    name="id"
                                    value={item._id}
                                />

                                <button
                                    type="submit"
                                    className={styles.deleteButton}
                                >
                                    Deletar
                                </button>

                            </form>

                        </div>
                    ))}

                </div>

            </div>
        </>
    );
}