"use client";

import styles from "./login.module.css";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );

      const token = await userCredential.user.getIdToken();

      document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Lax`;

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.error || "Erro ao autenticar no backend");
        return;
      }

      router.replace("/");

    } catch (err) {

      let message = "Erro ao fazer login";

      switch (err.code) {
        case "auth/invalid-credential":
          message = "Email ou senha incorretos";
          break;

        case "auth/user-not-found":
          message = "Usuário não encontrado";
          break;

        case "auth/too-many-requests":
          message = "Muitas tentativas. Tente mais tarde";
          break;

        default:
          message = "Erro inesperado";
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        <button
          type="submit"
          className={styles.button}
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/register")}
          className={styles.registerButton}
        >
          Criar conta
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}