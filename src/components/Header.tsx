"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

const navItems = [
  { href: "/#quem-somos", label: "Quem somos" },
  { href: "/#solucoes", label: "Soluções" },
  { href: "/#metodologia", label: "Metodologia" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#conteudo", label: "Conteúdo" },
  { href: "/#contato", label: "Contato" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((current) => !current);

  return (
    <header className={`${styles.headerSection} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="PlanUrbi - página inicial">
          <Image
            className={styles.logoImg}
            src="/logo-planurbi-horizontal.png"
            alt="Logo PlanUrbi"
            width={1920}
            height={586}
            priority
          />
        </Link>

        <nav className={styles.navDesktop}>
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/#contato" className={styles.navCta}>
            Solicitar diagnóstico
          </Link>
        </nav>

        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          <i className={isMenuOpen ? "bx bx-x" : "bx bx-menu"} aria-hidden="true" />
        </button>

        <nav className={`${styles.navMobile} ${isMenuOpen ? styles.open : ""}`} aria-hidden={!isMenuOpen}>
          {navItems.map((item) => (
            <Link href={item.href} key={item.href} onClick={toggleMenu}>
              {item.label}
            </Link>
          ))}
          <Link href="/#contato" className={styles.mobileCta} onClick={toggleMenu}>
            Solicitar diagnóstico
          </Link>
        </nav>
      </div>
    </header>
  );
}
