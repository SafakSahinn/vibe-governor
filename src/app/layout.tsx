import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// latin-ext carries the Turkish letters (ğ, ş, ı, İ).
const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "Vibe Governor | AI Project Constitution & Guardrails",
  description:
    "AI guidelines, Memory Bank and guard scripts for AI-assisted software and HDL projects. / Yapay zeka destekli yazılım ve donanım projeleri için kural, Memory Bank ve denetim sihirbazı.",
};

/**
 * Runs before first paint. The static HTML is prerendered in Turkish; when the
 * visitor's interface language is English the page is hidden until React has
 * re-rendered it in English (UiLocaleProvider removes the class). A timeout
 * guarantees the page is revealed even if JavaScript fails.
 * Keys must match UI_LOCALE_STORAGE_KEY / LOCALE_PENDING_CLASS in UiLocale.tsx.
 */
const LOCALE_BOOT_SCRIPT = `(function(){try{var k="vibe-governor-ui-locale",v=null;try{v=localStorage.getItem(k)}catch(e){}
var l=v==="tr"||v==="en"?v:((navigator.language||"").toLowerCase().indexOf("tr")===0?"tr":"en");
if(l==="en"){var d=document.documentElement;d.lang="en";d.classList.add("vg-locale-pending");
setTimeout(function(){d.classList.remove("vg-locale-pending")},2500);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOCALE_BOOT_SCRIPT }} />
      </head>
      <body className={`${inter.className} min-h-screen bg-slate-950 text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
