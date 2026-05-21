import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const anek = localFont({
  src: "../../public/fonts/AnekDevanagari-VariableFont_wdth,wght.ttf",
  variable: "--font-display",
  display: "swap",
  weight: "100 900",
});

const hauora = localFont({
  src: [
    { path: "../../public/fonts/Hauora-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../../public/fonts/Hauora-Light.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Hauora-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Hauora-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Hauora-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/Hauora-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Hauora-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PlanUrbi | Inteligência territorial para gestão municipal",
  description:
    "Planejamento urbano inteligente que integra dados, legislação, geotecnologias e participação social para transformar municípios.",
};

export const viewport = {
  themeColor: "#00362D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${anek.variable} ${hauora.variable}`}>
      <head>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
