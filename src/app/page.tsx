import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Marquee, FlagBands } from "@/components/Marquee";
import { ClubForm } from "@/components/ClubForm";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/menu";

const stars = ["pan-pistacchio", "piz-tartufo", "dol-big-five", "pia-tagliata"]
  .map((id) => products.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

const stats = [
  { to: 125, suffix: " g", label: "de burrata qui coule" },
  { to: 5, suffix: "", label: "parfums de tiramisu" },
  { to: 90, suffix: " s", label: "au four à bois" },
  { to: 100, suffix: " %", label: "viandes halal" },
];

const steps = [
  { n: "1", t: "Choisis", d: "Panuozzo, pizza, pasta ou dolci : compose ta commande sur le site ou dans l'appli.", c: "trame-verde" },
  { n: "2", t: "Commande", d: "Retrait sur place ou livraison, tu paies en ligne en quelques secondes.", c: "trame-crema text-ink" },
  { n: "3", t: "Savoure", d: "Ça sort du four à bois. Le plus dur, c'est d'attendre la première bouchée.", c: "trame-rosso" },
];

const gallery: [string, string, number][] = [
  ["/tavolata.jpg", "Une tablée à partager", -4],
  ["/four-a-bois.jpg", "Le four à bois", 3],
  ["/dolci.jpg", "Les tiramisus maison", -2],
  ["/fatto-a-mano.jpg", "Pâte faite main", 4],
  ["/chef.jpg", "En cuisine", -3],
];

const faq = [
  { q: "C'est halal ?", a: "Oui, toutes nos viandes sont halal." },
  { q: "Vous livrez où ?", a: "[ZONE DE LIVRAISON À CONFIRMER]. Les frais et le minimum de commande sont affichés au panier." },
  { q: "Je peux commander à l'avance ?", a: "Oui, choisis ton créneau au moment de payer." },
  { q: "Comment je paie ?", a: "Carte bancaire, Apple Pay ou Google Pay. Paiement 100 % sécurisé." },
  { q: "Et les allergènes ?", a: "Ils sont indiqués sur chaque fiche produit. Au moindre doute, appelle le resto." },
];

const hours = [
  ["Lundi - Jeudi", "11h30 - 14h30 · 18h30 - 23h"],
  ["Vendredi", "11h30 - 14h30 · 18h30 - 23h30"],
  ["Samedi - Dimanche", "12h - 23h30"],
];

export default function Home() {
  return (
    <>
      <main>
        <Hero />

        <Marquee />

        {/* MANIFESTE */}
        <section className="trame relative py-24 md:py-36">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 md:grid-cols-[1.2fr_1fr] md:px-8">
            <div>
              <Reveal><p className="font-script text-2xl text-rosso">Il manifesto</p></Reveal>
              <h2 className="titre mt-3 text-5xl md:text-7xl">
                <Reveal delay={1}>Une pâte faite main.</Reveal>
                <Reveal delay={2}><span className="text-verde-light">Un four à bois.</span></Reveal>
                <Reveal delay={3}>Une burrata qui coule.</Reveal>
              </h2>
              <Reveal delay={3}>
                <p className="mt-8 max-w-xl text-lg text-crema/80">
                  Ici on ne triche pas. La pâte repose, le four chauffe au bois, la viande est halal et les produits viennent d&apos;Italie. Simple, généreux, et franchement addictif.
                </p>
              </Reveal>
            </div>
            <Reveal delay={2} className="relative mx-auto aspect-[4/5] w-full max-w-md">
              <div className="absolute inset-0 rotate-3 rounded-[26px] bg-verde" />
              <div className="relative h-full -rotate-2 overflow-hidden rounded-[26px] border-4 border-crema shadow-2xl">
                <Image src="/fatto-a-mano.jpg" alt="Pizza garnie à la main avec de la mozzarella" fill className="object-cover" sizes="(max-width: 768px) 90vw, 450px" />
              </div>
              <span className="absolute -bottom-4 -left-3 -rotate-6 rounded-full bg-rosso px-5 py-2 font-script text-xl">Fatto a mano</span>
            </Reveal>
          </div>

          {/* Compteurs */}
          <div className="mx-auto mt-20 grid max-w-7xl grid-cols-2 gap-4 px-4 md:grid-cols-4 md:px-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={(i % 3 + 1) as 1 | 2 | 3} className="rounded-[26px] border-2 border-crema/10 bg-ink/70 p-6 text-center">
                <p className="titre text-5xl text-crema md:text-6xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm text-crema/65">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* INTOUCHABLES */}
        <section id="intouchables" className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="font-script text-2xl text-verde-light md:text-3xl">I titolari</p>
                <h2 className="titre text-6xl md:text-8xl">Les intouchables</h2>
              </div>
              <Link href="/menu" className="btn self-start border-2 border-crema/40 px-6 py-3 text-sm font-bold uppercase tracking-wide hover:bg-crema hover:text-ink md:self-auto">
                Toute la carte →
              </Link>
            </Reveal>
            <div className="mt-6 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
              {stars.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3 + 1) as 1 | 2 | 3} className={`flex ${i % 2 ? "lg:translate-y-10" : ""}`}>
                  <Link href="/menu" className="flex w-full">
                    <ProductCard p={p} rank={i + 1} />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FlagBands items={["Panuozzi", "Pizze", "Pasta fresca", "Risotto", "Dolci", "Bevande"]} />

        {/* FAMIGLIA */}
        <section id="famiglia" className="scroll-mt-24 py-24 md:py-36">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 md:grid-cols-2 md:px-8">
            <Reveal className="relative order-2 mx-auto aspect-[4/5] w-full max-w-md md:order-1">
              <div className="absolute inset-0 -rotate-3 rounded-[26px] bg-rosso" />
              <div className="relative h-full rotate-1 overflow-hidden rounded-[26px] border-4 border-crema">
                <Image src="/chef.jpg" alt="Le chef de Meat Temps aux fourneaux" fill className="object-cover" sizes="(max-width: 768px) 90vw, 450px" />
              </div>
              <span className="absolute -bottom-5 -right-3 rotate-[-6deg] rounded-full bg-crema px-5 py-2 font-script text-xl text-ink">il nostro chef</span>
            </Reveal>
            <div className="order-1 md:order-2">
              <Reveal><p className="font-script text-2xl text-rosso md:text-3xl">Famiglia</p></Reveal>
              <Reveal delay={1}>
                <h2 className="titre mt-3 text-4xl md:text-6xl">
                  C&apos;est généreux. Burrata de 125 g, frites maison double cuisson, tiramisu en cinq parfums.
                </h2>
              </Reveal>
              <Reveal delay={2}>
                <p className="mt-6 max-w-lg text-lg text-crema/80">
                  Chez Meat Temps, on ne pèse pas la gourmandise. Une équipe, un chef, un four, et des assiettes qui se partagent en famille comme entre potes.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* COMMENT GOUTER */}
        <section className="trame py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <Reveal>
              <h2 className="titre text-6xl md:text-8xl">
                Comment <span className="text-rosso">goûter</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={(i + 1) as 1 | 2 | 3}>
                  <div className={`card h-full p-8 ${s.c} ${i === 1 ? "md:-rotate-1" : i === 2 ? "md:rotate-1" : ""}`}>
                    <span className="titre grid h-16 w-16 place-items-center rounded-full bg-ink text-4xl text-crema">{s.n}</span>
                    <h3 className="titre mt-6 text-4xl">{s.t}</h3>
                    <p className="mt-3 opacity-85">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-12 text-center">
              <Link href="/menu" className="btn inline-block bg-rosso px-10 py-4 font-bold uppercase tracking-wide shadow-[0_6px_0_#0B5D3B]">
                C&apos;est parti
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ATMOSFERA */}
        <section id="atmosfera" className="scroll-mt-24 overflow-hidden py-24 md:py-32">
          <Reveal className="mx-auto max-w-7xl px-4 md:px-8">
            <p className="font-script text-2xl text-verde-light md:text-3xl">Vieni a trovarci</p>
            <h2 className="titre text-6xl md:text-8xl">Atmosfera</h2>
          </Reveal>
          <div className="no-scrollbar mt-12 flex snap-x gap-5 overflow-x-auto px-4 pb-12 pt-4 md:justify-center md:px-8">
            {gallery.map(([src, alt, r], i) => (
              <Reveal key={src} delay={(i % 3 + 1) as 1 | 2 | 3} className="shrink-0 snap-center">
                <figure
                  className="relative aspect-[3/4] w-60 overflow-hidden rounded-[26px] border-4 border-crema shadow-xl transition-transform duration-500 hover:rotate-0 hover:scale-[1.03] md:w-64"
                  style={{ transform: `rotate(${r}deg)` }}
                >
                  <Image src={src} alt={alt} fill className="object-cover" sizes="260px" />
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="text-center">
            <a href="https://www.instagram.com/meat_temps/" target="_blank" rel="noreferrer" className="btn inline-block px-4 py-2 font-bold uppercase tracking-wide text-verde-light">
              Suis-nous sur Insta @meat_temps →
            </a>
          </p>
        </section>

        {/* JUSTE A COTE */}
        <section className="px-4 py-12 md:px-8">
          <Reveal>
            <a
              href="https://off-side.vercel.app"
              className="card trame-crema group mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 p-8 text-ink md:flex-row md:items-center md:p-12"
            >
              <div>
                <p className="font-script text-2xl text-rosso">Juste à côté</p>
                <p className="titre mt-1 text-5xl md:text-7xl">Envie d&apos;un smash ?</p>
                <p className="mt-2 max-w-md font-medium text-ink/75">Burgers, grillades, tex-mex et cuisine tunisienne chez Offside, 100 % halal. Même gérant, même exigence.</p>
              </div>
              <span className="btn bg-ink px-8 py-4 font-bold uppercase tracking-wide text-crema">Découvre Offside →</span>
            </a>
          </Reveal>
        </section>

        {/* CLUB */}
        <section className="px-4 py-16 md:px-8">
          <Reveal className="trame-verde mx-auto max-w-7xl rounded-[26px] p-8 md:p-16">
            <p className="font-script text-2xl text-crema/90 md:text-3xl">Il club</p>
            <h2 className="titre mt-2 text-5xl md:text-7xl">Rejoins la Famiglia</h2>
            <p className="mt-4 max-w-2xl text-lg text-crema/90">
              Les nouveautés en avant-première, les offres du moment et la Giornata del dessert. Pas de spam, juste de la burrata dans ta boîte mail.
            </p>
            <div className="mt-8 max-w-xl">
              <ClubForm />
            </div>
          </Reveal>
        </section>

        {/* INFOS + FAQ */}
        <section id="infos" className="scroll-mt-24 py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:px-8">
            <Reveal>
              <h2 className="titre text-5xl md:text-6xl">Infos pratiques</h2>
              <div className="trame mt-8 space-y-6 rounded-[26px] border-2 border-crema/10 p-8">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-verde-light">Adresse</p>
                  <p className="mt-1 text-lg">[ADRESSE À CONFIRMER]<br />95350 Saint-Brice-sous-Forêt</p>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-verde-light">Horaires [à confirmer]</p>
                  <ul className="mt-2 space-y-1">
                    {hours.map(([d, h]) => (
                      <li key={d} className="flex justify-between gap-4 border-b border-crema/10 py-1.5">
                        <span>{d}</span>
                        <span className="text-right text-crema/80">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-verde-light">Téléphone</p>
                  <p className="mt-1 text-lg">[À CONFIRMER]</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="titre text-5xl md:text-6xl">FAQ</h2>
              <div className="mt-8 space-y-3">
                {faq.map((f) => (
                  <details key={f.q} className="group rounded-[26px] border-2 border-crema/10 bg-surface p-5 transition-colors open:border-verde-light/50">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold">
                      {f.q}
                      <span className="text-2xl text-rosso transition-transform duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-crema/75">{f.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />

      {/* Barre Commander fixe mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 p-3 md:hidden">
        <Link href="/menu" className="btn block bg-rosso py-4 text-center font-bold uppercase tracking-wide shadow-[0_14px_34px_-8px_rgba(215,38,46,0.6)]">
          Commande ton italien
        </Link>
      </div>
    </>
  );
}
