"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";

import styles from "./navbar.module.css";

export default function Navbar() {

  const [isLogged, setIsLogged] = useState(false);

  const [openUser, setOpenUser] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);

  useEffect(() => {

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    setIsLogged(!!token);

  }, []);

  const logout = () => {

    document.cookie = "token=; path=/; max-age=0";

    window.location.href = "/login";
  };

  return (
    <header className={styles.navbar}>

      <div className={styles.left}>

        <Link href="/">

          <Image
            src="/logo1.png"
            alt="Logo"
            width={180}
            height={60}
          />

        </Link>

      </div>

      <nav className={styles.center}>

        <Link href="/">
          Início
        </Link>

        <Link href="/desejo">
          Encontre Meu Carro
        </Link>

        {isLogged && (
          <div className={styles.adminWrapper}>

            <button
              className={styles.adminButton}
              onClick={() => setOpenAdmin(!openAdmin)}
            >
              Painel Admin
              <FaChevronDown size={12} />
            </button>

            {openAdmin && (
              <div className={styles.adminDropdown}>

                <Link
                  href="/admin/dashboard"
                  onClick={() => setOpenAdmin(false)}
                >
                  Dashboard
                </Link>

                <Link
                  href="/admin"
                  onClick={() => setOpenAdmin(false)}
                >
                  Cadastrar Carro
                </Link>

                <Link
                  href="/admin/midia"
                  onClick={() => setOpenAdmin(false)}
                >
                  Banners e Lojas
                </Link>

                <Link
                  href="/admin/desejos"
                  onClick={() => setOpenAdmin(false)}
                >
                  Desejos Clientes
                </Link>

              </div>
            )}

          </div>
        )}

      </nav>

      <div className={styles.right}>

        <div className={styles.user}>

          <FaUserCircle
            size={28}
            onClick={() => setOpenUser(!openUser)}
            className={styles.icon}
          />

          {openUser && (

            <div className={styles.dropdown}>

              {!isLogged ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpenUser(false)}
                  >
                    Login
                  </Link>
                </>
              ) : (
                <button onClick={logout}>
                  Logout
                </button>
              )}

            </div>

          )}

        </div>

      </div>

    </header>
  );
}