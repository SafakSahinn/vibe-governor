import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vibe Governor Web Sihirbazı | AI Project Constitution & Guardrails",
  description:
    "Yapay zeka destekli büyük ölçekli yazılım ve donanım projeleri için mimari kural, Memory Bank ve CI otomasyon sihirbazı.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} min-h-screen bg-slate-950 text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
