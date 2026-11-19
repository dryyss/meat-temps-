import Image from "next/image";
import { formatPrice, tagLabel, type Product, type Tag } from "@/data/menu";

const tagStyle: Record<Tag, string> = {
  populaire: "bg-rosso text-crema",
  vege: "bg-verde text-crema",
  epice: "bg-crema text-rosso",
};

/** Carte produit : photo ronde qui déborde en haut, tourne au hover */
export function ProductCard({ p, onClick, rank }: { p: Product; onClick?: () => void; rank?: number }) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag onClick={onClick} className="card group relative mt-[70px] flex w-full flex-col bg-surface px-5 pb-5 pt-[104px] text-left">
      <div className="card-photo">
        {p.image ? (
          <Image src={p.image} alt={p.name} fill className="object-cover" sizes="150px" />
        ) : (
          <div className={`grid h-full w-full place-items-center ${p.category === "dolci" || p.category === "pizze" ? "trame-rosso" : "trame-verde"}`}>
            <span className="titre px-3 text-center text-xl leading-none text-crema">{p.name.split(" ").slice(-1)[0]}</span>
          </div>
        )}
      </div>
      {rank !== undefined && (
        <span className="titre absolute left-4 top-4 rounded-full bg-rosso px-3 py-1 text-base">n°{rank}</span>
      )}
      <div className="flex min-h-5 flex-wrap justify-center gap-1">
        {p.tags.map((t) => (
          <span key={t} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tagStyle[t]}`}>
            {tagLabel[t]}
          </span>
        ))}
      </div>
      <h3 className="titre mt-2 text-center text-2xl">{p.name}</h3>
      <p className="mt-2 line-clamp-3 text-center text-sm text-crema/65">{p.description}</p>
      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="titre text-2xl text-verde-light">{formatPrice(p.price)}</span>
        {onClick && (
          <span className="btn grid h-11 w-11 place-items-center bg-rosso text-2xl font-bold group-hover:-translate-y-0.5 group-hover:-rotate-6" aria-hidden>
            +
          </span>
        )}
      </div>
    </Tag>
  );
}
