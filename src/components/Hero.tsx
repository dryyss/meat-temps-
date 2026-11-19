"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  // Parallaxe souris lissée (lerp) en requestAnimationFrame, arrêt quand delta < 0.2
  useEffect(() => {
    const section = sectionRef.current;
    const layer = layerRef.current;
    if (!section || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;

    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const step = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      layer.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      raf = Math.abs(tx - x) > 0.2 || Math.abs(ty - y) > 0.2 ? requestAnimationFrame(step) : 0;
    };
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 30;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 22;
      if (!raf) raf = requestAnimationFrame(step);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(step);
    };
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-glow relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 md:grid-cols-[1.15fr_1fr] md:px-8">
        <div className="relative z-10">
          <p className="rv in font-script text-2xl text-verde-light md:text-3xl">Fatto a mano</p>
          <h1 className="titre mt-2 text-[16vw] leading-[0.86] md:text-[8.5rem]">
            La vraie.
            <br />
            <span className="text-rosso">Au feu</span>
            <br />
            de bois.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-crema/85 md:text-xl">
            Pâte travaillée à la main, burrata qui coule, panuozzi qui croustillent. Tu commandes, on enfourne.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/menu" className="btn bg-rosso px-8 py-4 font-bold uppercase tracking-wide text-crema shadow-[0_6px_0_#0B5D3B]">
              Commande ton italien
            </Link>
            <Link href="#intouchables" className="btn border-2 border-crema/50 px-8 py-4 font-bold uppercase tracking-wide text-crema hover:bg-crema hover:text-ink">
              Voir les stars
            </Link>
          </div>
        </div>

        <div ref={layerRef} className="relative mx-auto aspect-square w-[78vw] max-w-[520px] will-change-transform">
          <div className="float relative h-full w-full">
            <div className="absolute inset-0 rotate-6 rounded-full trame-verde" />
            <div className="absolute inset-3 -rotate-3 overflow-hidden rounded-full border-[6px] border-crema shadow-[0_30px_80px_-20px_rgba(215,38,46,0.6)]">
              <Image src="/four-a-bois.jpg" alt="Le four à bois de Meat Temps en pleine chauffe" fill priority sizes="(max-width: 768px) 78vw, 520px" className="object-cover" />
            </div>
            <div className="absolute -bottom-2 -left-2 h-[38%] w-[38%] -rotate-12 overflow-hidden rounded-full border-4 border-crema shadow-2xl md:-left-8">
              <Image src="/fatto-a-mano.jpg" alt="Pizza garnie à la main" fill sizes="200px" className="object-cover" />
            </div>
            <span className="titre absolute -right-1 top-6 rotate-[8deg] rounded-full bg-rosso px-5 py-2 text-xl md:text-2xl">Halal · Four à bois</span>
          </div>
        </div>
      </div>
    </section>
  );
}
