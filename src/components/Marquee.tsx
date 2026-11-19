const DEFAULT = ["Pâte faite main", "Four à bois", "Cucina italiana", "Viandes halal", "Burrata 125 g", "Tiramisu maison"];

const tones = {
  verde: "trame-verde text-crema",
  crema: "trame-crema text-ink",
  rosso: "trame-rosso text-crema",
} as const;

export function Marquee({
  items = DEFAULT,
  tone = "rosso",
  tilt = -2,
  reverse = false,
}: {
  items?: string[];
  tone?: keyof typeof tones;
  tilt?: number;
  reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className="relative z-10 -mx-4 overflow-hidden" style={{ transform: `rotate(${tilt}deg)` }} aria-hidden>
      <div className={`${tones[tone]} border-y-4 border-ink py-3`}>
        <div className={`mq flex w-max ${reverse ? "rev" : ""}`}>
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {row.map((t, i) => (
                <span key={i} className="titre flex items-center whitespace-nowrap px-5 text-2xl md:text-4xl">
                  {t}
                  <span className="ml-10 text-lg opacity-70">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Bandeaux inclinés façon drapeau italien : vert, crème, rouge */
export function FlagBands({ items }: { items?: string[] }) {
  return (
    <div className="relative py-10">
      <Marquee tone="verde" tilt={-3} items={items} />
      <div className="-mt-2"><Marquee tone="crema" tilt={1.5} reverse items={items} /></div>
      <div className="-mt-2"><Marquee tone="rosso" tilt={-1.5} items={items} /></div>
    </div>
  );
}
