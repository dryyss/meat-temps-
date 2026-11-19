"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

const links = [
  ["/menu", "Menu"],
  ["/#famiglia", "Famiglia"],
  ["/#atmosfera", "Atmosfera"],
  ["/#infos", "Infos"],
];

export function Header() {
  const { count, setOpen, bumpKey } = useCart();
  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3">
      <div className="nav-pill mx-auto flex max-w-[1120px] items-center justify-between gap-3 rounded-full border border-crema/10 py-2 pl-5 pr-2 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)]">
        <Link href="/" className="flex items-baseline gap-2" aria-label="Meat Temps, accueil">
          <span className="titre text-2xl tracking-wide md:text-3xl">
            Meat <span className="text-rosso">Temps</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="btn px-4 py-2 text-sm font-semibold uppercase tracking-wider text-crema/80 hover:bg-crema/10 hover:text-crema">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/menu" className="btn px-3 py-2 text-sm font-semibold uppercase tracking-wider text-crema/80 md:hidden">
            Menu
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="btn flex items-center gap-2 bg-rosso py-2.5 pl-5 pr-2.5 text-sm font-bold uppercase tracking-wide text-crema"
            aria-label={`Ouvrir le panier, ${count} article${count > 1 ? "s" : ""}`}
          >
            Panier
            <span key={bumpKey} className={`grid h-7 min-w-7 place-items-center rounded-full bg-crema px-1.5 text-xs font-black text-rosso ${bumpKey ? "bump" : ""}`}>
              {count}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
