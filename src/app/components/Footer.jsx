"use client";

import Link from "next/link";

import {
    FaInstagram,
    FaWhatsapp,
    FaFacebookF,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
} from "react-icons/fa";

import styles from "./footer.module.css";

export default function Footer() {

    return (
        <footer className={styles.footer}>

            <div className={styles.container}>

                <div className={styles.column}>

                    <h2 className={styles.logo}>
                        WebGaragem
                    </h2>

                    <p className={styles.text}>
                        Concessionária premium especializada
                        em todos os tipos de veículos.
                    </p>

                </div>

                <div className={styles.column}>

                    <h3>
                        Navegação
                    </h3>

                    <div className={styles.links}>

                        <Link href="/">
                            Início
                        </Link>

                        <Link href="/desejo">
                            Encontre Meu Carro
                        </Link>

                        <Link href="/login">
                            Login
                        </Link>

                    </div>

                </div>
                <div className={styles.column}>

                    <h3>
                        Contato
                    </h3>

                    <div className={styles.contact}>

                        <span>
                            <FaMapMarkerAlt />
                            Brasília - DF
                        </span>

                        <span>
                            <FaPhoneAlt />
                            (61) 99999-9999
                        </span>

                        <span>
                            <FaEnvelope />
                            contato@webgaragem.com
                        </span>

                    </div>

                </div>

                <div className={styles.column}>

                    <h3>
                        Redes Sociais
                    </h3>

                    <div className={styles.socials}>

                        <a href="#">
                            <FaInstagram />
                        </a>

                        <a href="#">
                            <FaWhatsapp />
                        </a>

                        <a href="#">
                            <FaFacebookF />
                        </a>

                    </div>

                </div>

            </div>

            <div className={styles.bottom}>

                © 2026 WebGaragem — Todos os direitos reservados.

            </div>

        </footer>
    );
}