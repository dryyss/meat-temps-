import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { MenuBoard } from "@/components/MenuBoard";

export const metadata: Metadata = {
  title: "Menu Meat Temps | Pizzas, panuozzi, pasta et dolci",
  description: "Découvre toute la carte Meat Temps et commande en ligne en quelques clics.",
};

export default function MenuPage() {
  return (
    <>
      <main>
        <section className="hero-glow px-4 pb-8 pt-32 md:px-8 md:pt-40">
          <div className="mx-auto max-w-7xl">
            <p className="rv in font-script text-2xl text-verde-light md:text-3xl">La carta</p>
            <h1 className="titre text-[15vw] leading-[0.86] md:text-[8rem]">
              Fais ta <span className="text-rosso">compo</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-crema/80">Retrait sur place ou livraison. Tout est préparé minute, la pâte cuite au four à bois.</p>
          </div>
        </section>
        <MenuBoard />
      </main>
      <Footer />
    </>
  );
}
