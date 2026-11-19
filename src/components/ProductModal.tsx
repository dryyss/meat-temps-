"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { optionGroups, formatPrice, type Product } from "@/data/menu";
import { useCart } from "./CartContext";

export function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const groups = (product.options ?? []).map((id) => optionGroups[id]);
  const [qty, setQty] = useState(1);
  const [picked, setPicked] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(groups.map((g) => [g.id, g.type === "single" && g.required ? [g.choices[0].id] : []])),
  );
  const { add, setOpen } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    
    return () => {
      document.removeEventListener("keydown", onKey);
      
    };
  }, [onClose]);

  const chosen = groups.flatMap((g) => g.choices.filter((c) => picked[g.id]?.includes(c.id)));
  const unit = product.price + chosen.reduce((s, c) => s + c.price, 0);

  const toggle = (gid: string, cid: string, single: boolean) =>
    setPicked((p) => {
      const cur = p[gid] ?? [];
      if (single) return { ...p, [gid]: [cid] };
      return { ...p, [gid]: cur.includes(cid) ? cur.filter((x) => x !== cid) : [...cur, cid] };
    });

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center scrim open md:items-center md:p-6" onClick={onClose} role="dialog" aria-modal aria-label={product.name}>
      <div
        className="flex max-h-[92svh] w-full max-w-lg flex-col overflow-hidden trame rounded-t-[26px] border border-crema/10 md:rounded-[26px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-56 shrink-0 md:h-64">
          {product.image ? (
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="512px" />
          ) : (
            <div className="trame-verde absolute inset-0 grid place-items-center">
              <span className="titre px-6 text-center text-5xl text-crema/90">{product.name}</span>
            </div>
          )}
          <button onClick={onClose} className="absolute right-4 top-4 grid h-10 w-10 place-items-center btn bg-ink/80 text-xl" aria-label="Fermer">
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="titre text-4xl">{product.name}</h2>
          <p className="mt-2 text-crema/75">{product.description}</p>
          <p className="mt-2 text-xs text-crema/45">Allergènes : renseignés par le restaurant [À COMPLÉTER]</p>

          {groups.map((g) => (
            <fieldset key={g.id} className="mt-6">
              <legend className="mb-2 flex w-full items-center justify-between text-sm font-bold uppercase tracking-wider">
                {g.name}
                <span className="text-xs font-semibold normal-case text-crema/50">{g.required ? "Obligatoire" : "Facultatif"}</span>
              </legend>
              <div className="space-y-2">
                {g.choices.map((c) => {
                  const on = picked[g.id]?.includes(c.id);
                  return (
                    <label
                      key={c.id}
                      className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 transition ${
                        on ? "border-verde-light bg-verde/40" : "border-crema/10 bg-ink/50 hover:border-crema/30"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type={g.type === "single" ? "radio" : "checkbox"}
                          name={g.id}
                          checked={!!on}
                          onChange={() => toggle(g.id, c.id, g.type === "single")}
                          className="accent-[#5BC48A]"
                        />
                        {c.name}
                      </span>
                      {c.price > 0 && <span className="text-sm text-crema/70">+{formatPrice(c.price)}</span>}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
        <div className="flex items-center gap-3 border-t border-crema/10 bg-ink/70 p-4">
          <div className="flex items-center rounded-full bg-ink">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-12 w-12 text-xl" aria-label="Retirer un">−</button>
            <span className="w-6 text-center font-bold">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="h-12 w-12 text-xl" aria-label="Ajouter un">+</button>
          </div>
          <button
            onClick={() => {
              add({ productId: product.id, name: product.name, unitPrice: unit, qty, details: chosen.map((c) => c.name) });
              onClose();
              setOpen(true);
            }}
            className="btn flex flex-1 items-center justify-between bg-rosso px-6 py-3.5 font-bold uppercase tracking-wide"
          >
            <span>Ajouter</span>
            <span>{formatPrice(unit * qty)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
