"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatPrice } from "@/data/menu";
import { useCart } from "./CartContext";

type Step = "cart" | "checkout" | "done";
const DELIVERY_FEE = 2.9;

function slots() {
  const out: string[] = [];
  const d = new Date();
  d.setMinutes(Math.ceil((d.getMinutes() + 25) / 15) * 15, 0, 0);
  for (let i = 0; i < 8; i++) {
    out.push(d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
    d.setMinutes(d.getMinutes() + 15);
  }
  return out;
}

const field = "w-full rounded-2xl border border-crema/15 bg-ink/60 px-4 py-3 text-sm placeholder:text-crema/40 focus:border-verde-light focus:outline-none";

export function CartDrawer() {
  const { lines, total, open, setOpen, setQty, clear } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [mode, setMode] = useState<"retrait" | "livraison">("retrait");
  const [slot, setSlot] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [paying, setPaying] = useState(false);
  const available = useMemo(() => (open ? slots() : []), [open]);

  useEffect(() => {
    if (open) setSlot((s) => (available.includes(s) ? s : available[0] ?? ""));
    else if (step === "done") setStep("cart");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const grand = total + (mode === "livraison" ? DELIVERY_FEE : 0);

  const pay = () => {
    setPaying(true);
    setTimeout(() => {
      setOrderNo(`MT-${Math.floor(1000 + Math.random() * 9000)}`);
      clear();
      setPaying(false);
      setStep("done");
    }, 1200);
  };

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div className={`scrim absolute inset-0 ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
      <aside
        className={`drawer trame absolute right-0 top-0 flex h-full w-full max-w-md flex-col shadow-2xl ${open ? "open" : ""}`}
        aria-label="Panier"
        role="dialog"
      >
        <div className="tricolore h-1.5" />
        <div className="flex items-center justify-between border-b border-crema/10 px-6 py-4">
          <h2 className="titre text-3xl">{step === "checkout" ? "Ta commande" : step === "done" ? "Grazie !" : "Ton panier"}</h2>
          <button onClick={() => setOpen(false)} className="btn grid h-10 w-10 place-items-center bg-ink text-crema" aria-label="Fermer le panier">✕</button>
        </div>

        {step === "done" ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-verde text-4xl">✓</span>
            <p className="titre text-4xl">Commande {orderNo}</p>
            <p className="text-crema/80">
              {mode === "retrait" ? `À récupérer au comptoir à ${slot}.` : `Livraison prévue vers ${slot}.`} On enfourne !
            </p>
            <p className="rounded-2xl border border-dashed border-crema/30 p-4 text-sm text-crema/60">
              Commande de démo : aucun paiement réel. Le paiement Stripe est branché en phase 4.
            </p>
            <button onClick={() => setOpen(false)} className="btn mt-2 bg-rosso px-8 py-3 font-bold uppercase">Fermer</button>
          </div>
        ) : !lines.length ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="titre text-5xl text-crema/25">Panier vide</p>
            <p className="font-script text-xl text-verde-light">Il forno è caldo…</p>
            <p className="text-crema/60">Le four est chaud, il n&apos;attend que toi.</p>
            <Link href="/menu" onClick={() => setOpen(false)} className="btn mt-2 bg-rosso px-8 py-3 font-bold uppercase">Voir la carte</Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              {step === "cart" ? (
                <ul className="space-y-4">
                  {lines.map((l) => (
                    <li key={l.key} className="flex gap-3 border-b border-crema/10 pb-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-bold">{l.name}</p>
                        {l.details.length > 0 && <p className="text-xs text-crema/55">{l.details.join(" · ")}</p>}
                        <p className="mt-1 text-sm font-semibold text-verde-light">{formatPrice(l.unitPrice * l.qty)}</p>
                      </div>
                      <div className="flex h-9 items-center self-center rounded-full bg-ink">
                        <button onClick={() => setQty(l.key, l.qty - 1)} className="h-9 w-9" aria-label="Retirer un">−</button>
                        <span className="w-5 text-center text-sm font-bold">{l.qty}</span>
                        <button onClick={() => setQty(l.key, l.qty + 1)} className="h-9 w-9" aria-label="Ajouter un">+</button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-6">
                  <div>
                    <p className="mb-2 text-sm font-bold uppercase tracking-wider">Mode</p>
                    <div className="grid grid-cols-2 gap-2">
                      {(["retrait", "livraison"] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setMode(m)}
                          className={`rounded-2xl border-2 p-4 text-left transition ${mode === m ? "border-verde-light bg-verde/40" : "border-crema/10 bg-ink/60"}`}
                        >
                          <p className="font-bold">{m === "retrait" ? "Retrait" : "Livraison"}</p>
                          <p className="text-xs text-crema/60">{m === "retrait" ? "Gratuit, au comptoir" : `+${formatPrice(DELIVERY_FEE)}`}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  {mode === "livraison" && <input placeholder="Adresse de livraison" className={field} />}
                  <div>
                    <p className="mb-2 text-sm font-bold uppercase tracking-wider">Créneau</p>
                    <div className="grid grid-cols-4 gap-2">
                      {available.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSlot(s)}
                          className={`rounded-full border py-2 text-sm font-semibold transition ${slot === s ? "border-crema bg-crema text-ink" : "border-crema/15 bg-ink/60"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <input placeholder="Prénom" className={field} />
                    <input placeholder="Téléphone" type="tel" className={field} />
                  </div>
                  <div className="rounded-2xl border border-crema/10 bg-ink/60 p-4">
                    <p className="text-sm font-bold uppercase tracking-wider">Paiement</p>
                    <p className="mt-1 text-sm text-crema/60">Carte bancaire, Apple Pay, Google Pay (Stripe)</p>
                    <div className="mt-3 rounded-xl border border-crema/10 px-4 py-3 font-mono text-sm text-crema/40">4242 4242 4242 4242 · 12/28 · 123</div>
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-crema/10 bg-ink/70 p-6">
              <div className="mb-1 flex justify-between text-sm text-crema/70">
                <span>Sous-total</span>
                <span>{formatPrice(total)}</span>
              </div>
              {step === "checkout" && mode === "livraison" && (
                <div className="mb-1 flex justify-between text-sm text-crema/70">
                  <span>Livraison</span>
                  <span>{formatPrice(DELIVERY_FEE)}</span>
                </div>
              )}
              <div className="mb-4 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>{formatPrice(step === "checkout" ? grand : total)}</span>
              </div>
              {step === "cart" ? (
                <button onClick={() => setStep("checkout")} className="btn w-full bg-rosso py-4 font-bold uppercase tracking-wide">
                  Commander
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setStep("cart")} className="btn border border-crema/20 px-5 py-4 font-bold" aria-label="Retour au panier">←</button>
                  <button
                    onClick={pay}
                    disabled={paying}
                    className="btn flex-1 bg-verde-light py-4 font-bold uppercase tracking-wide text-ink disabled:opacity-60"
                  >
                    {paying ? "Paiement…" : `Payer ${formatPrice(grand)}`}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
