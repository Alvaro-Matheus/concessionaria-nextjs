import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "WebGaragem",
  description: "Sistema de gerenciamento de carros",
};

export default function RootLayout({ children }) {

  return (
    <html
      lang="pt-BR"
      className={inter.className}
      data-scroll-behavior="smooth"
    >

      <body>

        {children}

        <Footer />

      </body>

    </html>
  );
}