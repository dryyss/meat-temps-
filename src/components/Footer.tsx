import Link from "next/link";

export function Footer() {
  return (
    <footer className="trame relative overflow-hidden border-t-4 border-rosso pb-28 pt-16 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-10 text-sm text-crema/75 md:grid-cols-4">
          <div>
            <p className="titre text-2xl text-crema">Meat Temps</p>
            <p className="mt-2">Cucina italiana au feu de bois. Viandes halal.</p>
          </div>
          <div>
            <p className="mb-2 font-bold uppercase tracking-wider text-crema">Le resto</p>
            <ul className="space-y-1">
              <li><Link href="/menu" className="hover:text-verde-light">Menu & commande</Link></li>
              <li><Link href="/#famiglia" className="hover:text-verde-light">Famiglia</Link></li>
              <li><Link href="/#atmosfera" className="hover:text-verde-light">Atmosfera</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-2 font-bold uppercase tracking-wider text-crema">Suis-nous</p>
            <ul className="space-y-1">
              <li><a href="https://www.instagram.com/meat_temps/" target="_blank" rel="noreferrer" className="hover:text-verde-light">Instagram @meat_temps</a></li>
              <li><a href="https://off-side.vercel.app" className="hover:text-verde-light">Offside, juste à côté</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-2 font-bold uppercase tracking-wider text-crema">Légal</p>
            <ul className="space-y-1">
              <li>Mentions légales</li>
              <li>CGV</li>
              <li>Confidentialité</li>
            </ul>
          </div>
        </div>
        <p className="titre mt-16 select-none text-[19vw] leading-[0.8] text-crema md:text-[15vw]">
          Buono<span className="text-rosso">.</span>
          <br />
          <span className="text-verde-light">Sempre.</span>
        </p>
        <div className="mt-8 flex flex-col justify-between gap-2 text-xs text-crema/50 md:flex-row">
          <p>© {new Date().getFullYear()} Meat Temps, Saint-Brice-sous-Forêt</p>
          <p>Site réalisé par Magar Développement</p>
        </div>
      </div>
    </footer>
  );
}
