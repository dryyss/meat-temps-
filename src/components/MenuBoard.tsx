"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { categories, products, formatPrice, tagLabel, type Product, type Tag } from "@/data/menu";
import { ProductModal } from "./ProductModal";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";
import { useCart } from "./CartContext";

const filters: Tag[] = ["populaire", "vege", "epice"];
const STICKY_OFFSET = 150;

export function MenuBoard() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Tag[]>([]);
  const [current, setCurrent] = useState(categories[0].id);
  const [selected, setSelected] = useState<Product | null>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const { count, total, setOpen } = useCart();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) &&
        active.every((t) => p.tags.includes(t)),
    );
  }, [query, active]);

  // Scrollspy : active la chip de la section visible
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setCurrent(top.target.id.replace("cat-", ""));
      },
      { rootMargin: `-${STICKY_OFFSET + 10}px 0px -55% 0px` },
    );
    document.querySelectorAll("[data-cat]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [visible]);

  // Garde la chip active visible dans la barre horizontale
  useEffect(() => {
    const chip = chipsRef.current?.querySelector<HTMLElement>(`[data-chip="${current}"]`);
    const bar = chipsRef.current;
    if (chip && bar) bar.scrollTo({ left: chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
  }, [current]);

  const goTo = (id: string) => {
    const el = document.getElementById(`cat-${id}`);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET, behavior: "smooth" });
  };

  return (
    <>
      {/* Chips sticky sous la nav */}
      <div className="sticky top-[76px] z-30 px-3">
        <div className="chips mx-auto max-w-[1120px] rounded-full border border-crema/10 p-1.5">
          <div ref={chipsRef} className="no-scrollbar relative flex gap-1.5 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                data-chip={c.id}
                onClick={() => goTo(c.id)}
                className={`btn shrink-0 px-4 py-2 text-sm font-bold uppercase tracking-wide ${
                  current === c.id ? "bg-crema text-ink" : "text-crema/75 hover:text-crema"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-36 md:px-8">
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cherche une burrata, une pasta…"
            className="w-full rounded-full border border-crema/15 bg-surface px-5 py-3 text-sm text-crema placeholder:text-crema/40 focus:border-verde-light focus:outline-none sm:max-w-sm"
            aria-label="Rechercher un produit"
          />
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {filters.map((t) => {
              const on = active.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => setActive((a) => (on ? a.filter((x) => x !== t) : [...a, t]))}
                  aria-pressed={on}
                  className={`btn shrink-0 border px-4 py-2 text-xs font-bold uppercase tracking-wide ${
                    on ? "border-verde-light bg-verde-light text-ink" : "border-crema/20 text-crema/80 hover:border-crema"
                  }`}
                >
                  {tagLabel[t]}
                </button>
              );
            })}
          </div>
        </div>

        {categories.map((c) => {
          const items = visible.filter((p) => p.category === c.id);
          if (!items.length) return null;
          return (
            <section key={c.id} id={`cat-${c.id}`} data-cat className="pt-14">
              <Reveal>
                <h2 className="titre text-5xl md:text-7xl">{c.name}</h2>
                <p className="mt-1 font-script text-lg text-verde-light md:text-xl">{c.tagline}</p>
              </Reveal>
              <div className="grid gap-x-5 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p, i) => (
                  <Reveal key={p.id} delay={(Math.min(i % 3, 2) + 1) as 1 | 2 | 3} className="flex">
                    <ProductCard p={p} onClick={() => setSelected(p)} />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
        {!visible.length && <p className="py-20 text-center text-crema/60">Rien trouvé. Essaie « burrata » ou retire un filtre.</p>}
      </div>

      {/* Barre Commander fixe en bas (mobile) / pilule flottante (desktop) */}
      {count > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 p-3 md:bottom-6 md:left-auto md:right-6 md:p-0">
          <button
            onClick={() => setOpen(true)}
            className="btn flex w-full items-center justify-between gap-6 bg-rosso px-3 py-3 font-bold uppercase tracking-wide shadow-[0_14px_34px_-8px_rgba(215,38,46,0.6)] md:w-auto md:pr-6"
          >
            <span className="grid h-9 min-w-9 place-items-center rounded-full bg-crema px-2 text-sm text-rosso">{count}</span>
            <span>Voir mon panier</span>
            <span>{formatPrice(total)}</span>
          </button>
        </div>
      )}

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
