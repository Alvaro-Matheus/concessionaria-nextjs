"use client";

import styles from "./register.module.css";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email.trim(),
                password.trim()
            );

            alert("Conta criada com sucesso!");

            router.push("/login");
        } catch (err) {

            let message = "Erro ao criar conta";

            switch (err.code) {
                case "auth/email-already-in-use":
                    message = "Este email já está em uso";
                    break;

                case "auth/invalid-email":
                    message = "Email inválido";
                    break;

                case "auth/weak-password":
                    message = "Senha deve ter no mínimo 6 caracteres";
                    break;

                default:
                    message = "Erro ao registrar usuário";
            }

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleRegister} className={styles.form}>
                <h2>Criar Conta</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                />

                <input
                    type="password"
                    placeholder="Senha (mínimo 6 caracteres)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                />

                <button
                    type="submit"
                    className={styles.button}
                    disabled={loading}
                >
                    {loading ? "Criando..." : "Criar conta"}
                </button>

                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
}