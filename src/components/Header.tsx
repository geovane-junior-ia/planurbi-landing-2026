"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

const navItems = [
  { href: "/#quem-somos", label: "Quem somos" },
  { href: "/#solucoes", label: "Solucoes" },
  { href: "/#metodologia", label: "Metodologia" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#conteudo", label: "Conteudo" },
  { href: "/#contato", label: "Contato" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((current) => !current);

  return (
    <header className={`${styles.headerSection} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={`${styles.logo} ${isScrolled ? styles.visible : ""}`}>
          <Image src="/icon-azul.png" alt="Logo PlanUrbi" width={70} height={45} priority />
        </Link>

        <nav className={styles.navDesktop}>
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button className={styles.hamburger} onClick={toggleMenu} aria-label="Abrir menu">
          <i className={isMenuOpen ? "bx bx-x" : "bx bx-menu"} />
        </button>

        <nav className={`${styles.navMobile} ${isMenuOpen ? styles.open : ""}`}>
          {navItems.map((item) => (
            <Link href={item.href} key={item.href} onClick={toggleMenu}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
