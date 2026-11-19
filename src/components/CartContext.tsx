"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

export type CartLine = {
  key: string;
  productId: string;
  name: string;
  unitPrice: number;
  qty: number;
  details: string[];
};

type CartCtx = {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (line: Omit<CartLine, "key">) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  /** incrémenté à chaque ajout : sert à rejouer l'animation bump */
  bumpKey: number;
  toast: string | null;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "meat-temps-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [bumpKey, setBumpKey] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, loaded]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const total = lines.reduce((s, l) => s + l.qty * l.unitPrice, 0);
    return {
      lines,
      count,
      total,
      open,
      setOpen,
      bumpKey,
      toast,
      add: (line) => {
        const key = `${line.productId}|${line.details.join(",")}`;
        setLines((prev) => {
          const found = prev.find((l) => l.key === key);
          if (found) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + line.qty } : l));
          return [...prev, { ...line, key }];
        });
        setBumpKey((k) => k + 1);
        setToast(`${line.qty > 1 ? `${line.qty} × ` : ""}${line.name}`);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 2200);
      },
      setQty: (key, qty) =>
        setLines((prev) => (qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l)))),
      clear: () => setLines([]),
    };
  }, [lines, open, bumpKey, toast]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartToast() {
  const { toast } = useCart();
  const [last, setLast] = useState("");
  useEffect(() => {
    if (toast) setLast(toast);
  }, [toast]);
  return (
    <div
      role="status"
      aria-live="polite"
      className={`toast fixed bottom-24 left-1/2 z-[60] flex items-center gap-3 rounded-full bg-crema py-3 pl-3 pr-6 text-ink shadow-[0_18px_40px_-10px_rgba(0,0,0,0.6)] md:bottom-8 ${toast ? "show" : ""}`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-full bg-verde font-bold text-crema">✓</span>
      <span className="text-sm">
        <strong className="font-bold">Ajouté au panier</strong>
        <span className="hidden text-ink/70 sm:inline"> · {last}</span>
      </span>
    </div>
  );
}
