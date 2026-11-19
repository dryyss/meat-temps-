import type { Metadata, Viewport } from "next";
import { Anton, Inter, Kaushan_Script } from "next/font/google";
import { CartProvider, CartToast } from "@/components/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import { Header } from "@/components/Header";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const kaushan = Kaushan_Script({ weight: "400", subsets: ["latin"], variable: "--font-kaushan", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://meat-temps.vercel.app"),
  title: "Meat Temps | Pizzeria italienne au feu de bois à Saint-Brice-sous-Forêt",
  description:
    "Pizza napolitaine au four à bois, panuozzi, pasta fraîche et tiramisu maison. Viandes halal. Commande en ligne, retrait ou livraison.",
  openGraph: {
    title: "Meat Temps | La vraie. Au feu de bois.",
    description: "Pâte faite main, four à bois, burrata qui coule. Commande en ligne, retrait ou livraison.",
    images: ["/fatto-a-mano.jpg"],
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0E1116" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${anton.variable} ${kaushan.variable} ${inter.variable}`}>
      <body className="min-h-screen overflow-x-hidden">
        <CartProvider>
          <Header />
          {children}
          <CartDrawer />
          <CartToast />
        </CartProvider>
      </body>
    </html>
  );
}
