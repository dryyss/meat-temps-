export type Tag = "populaire" | "vege" | "epice";

export type OptionGroup = {
  id: string;
  name: string;
  type: "single" | "multi";
  required?: boolean;
  choices: { id: string; name: string; price: number }[];
};

export type Product = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  tags: Tag[];
  image?: string;
  options?: string[]; // ids de OptionGroup
};

export type Category = { id: string; name: string; tagline: string };

export const categories: Category[] = [
  { id: "panuozzi", name: "Panuozzi", tagline: "Le numéro 10 de la maison. Il crochète, il régale." },
  { id: "pizze", name: "Pizze", tagline: "Au four à bois, 90 secondes chrono. Une frappe en pleine lucarne." },
  { id: "pasta", name: "Pasta", tagline: "Le milieu récupérateur : solide, généreux, indispensable." },
  { id: "risotto", name: "Risotto", tagline: "La patience du libéro. Ça se travaille, ça se mérite." },
  { id: "piatti", name: "Piatti", tagline: "Les défenseurs centraux. Du costaud, rien ne passe." },
  { id: "dolci", name: "Dolci", tagline: "Le but dans les arrêts de jeu. Personne ne part avant." },
  { id: "bevande", name: "Bevande", tagline: "La pause fraîcheur à la mi-temps." },
];

export const optionGroups: Record<string, OptionGroup> = {
  taille: {
    id: "taille",
    name: "Taille",
    type: "single",
    required: true,
    choices: [
      { id: "normale", name: "Normale (31 cm)", price: 0 },
      { id: "maxi", name: "Maxi (40 cm)", price: 4 },
    ],
  },
  supplements: {
    id: "supplements",
    name: "Suppléments",
    type: "multi",
    choices: [
      { id: "burrata", name: "Burrata 125 g", price: 4.5 },
      { id: "stracciatella", name: "Stracciatella", price: 3 },
      { id: "mortadelle", name: "Mortadelle pistache", price: 3 },
      { id: "truffe", name: "Crème de truffe", price: 3.5 },
      { id: "piquant", name: "Huile pimentée maison", price: 0.5 },
    ],
  },
  pates: {
    id: "pates",
    name: "Pâtes",
    type: "single",
    required: true,
    choices: [
      { id: "rigatoni", name: "Rigatoni", price: 0 },
      { id: "spaghetti", name: "Spaghetti", price: 0 },
      { id: "tagliatelle", name: "Tagliatelle fraîches", price: 1.5 },
    ],
  },
  accompagnement: {
    id: "accompagnement",
    name: "Accompagnement",
    type: "single",
    required: true,
    choices: [
      { id: "frites", name: "Frites maison double cuisson", price: 0 },
      { id: "salade", name: "Salade roquette & grana", price: 0 },
      { id: "pasta", name: "Pasta al burro", price: 1 },
    ],
  },
  parfum: {
    id: "parfum",
    name: "Parfum",
    type: "single",
    required: true,
    choices: [
      { id: "classique", name: "Classique", price: 0 },
      { id: "nutella", name: "Nutella", price: 0 },
      { id: "pistache", name: "Pistache", price: 0.5 },
      { id: "fraise", name: "Fraise", price: 0 },
      { id: "dattes", name: "Dattes", price: 0 },
    ],
  },
};

export const products: Product[] = [
  // Panuozzi
  { id: "pan-pistacchio", category: "panuozzi", name: "Panuozzo Pistacchio", description: "Pesto de pistache, mortadelle halal, stracciatella crémeuse et éclats de pistache dans notre pain panuozzo cuit au four. Le best-seller.", price: 17.9, tags: ["populaire"], image: "/fatto-a-mano.jpg", options: ["supplements"] },
  { id: "pan-salame", category: "panuozzi", name: "Panuozzo Salame", description: "Salami de bœuf halal, mozzarella fior di latte, tomates confites et roquette. Croustillant dehors, fondant dedans.", price: 15.9, tags: [], options: ["supplements"] },
  { id: "pan-pollo", category: "panuozzi", name: "Panuozzo Pollo", description: "Poulet mariné au citron et origan, scamorza fumée, poivrons grillés et sauce basilic.", price: 15.5, tags: [], options: ["supplements"] },
  { id: "pan-diavola", category: "panuozzi", name: "Panuozzo Diavola", description: "Spianata piquante, mozzarella, nduja et miel au piment. Pour ceux qui aiment quand ça chauffe.", price: 16.5, tags: ["epice"], options: ["supplements"] },
  // Pizze
  { id: "piz-margherita", category: "pizze", name: "Pizza Margherita", description: "Sauce tomate San Marzano, fior di latte, basilic frais et huile d'olive. La base, la vraie.", price: 11.9, tags: ["vege"], image: "/fatto-a-mano.jpg", options: ["taille", "supplements"] },
  { id: "piz-tartufo", category: "pizze", name: "Pizza Tartufo", description: "Crème de truffe noire, burrata entière de 125 g et carpaccio de truffe d'été. La pizza des grands soirs.", price: 19.9, tags: ["populaire"], options: ["taille", "supplements"] },
  { id: "piz-burrata", category: "pizze", name: "Pizza Burrata", description: "Tomate, fior di latte, jambon de dinde fumé, roquette et burrata qui coule au centre.", price: 16.9, tags: ["populaire"], options: ["taille", "supplements"] },
  { id: "piz-quattro", category: "pizze", name: "Pizza Quattro Formaggi", description: "Fior di latte, gorgonzola, grana padano et scamorza fumée sur crème fraîche.", price: 14.9, tags: ["vege"], options: ["taille", "supplements"] },
  { id: "piz-calabrese", category: "pizze", name: "Pizza Calabrese", description: "Tomate, mozzarella, spianata piquante halal, oignons rouges et piments de Calabre.", price: 14.5, tags: ["epice"], options: ["taille", "supplements"] },
  // Pasta
  { id: "pas-carbonara", category: "pasta", name: "Carbonara della Casa", description: "Jaune d'œuf, grana padano, poitrine de bœuf fumée et poivre noir. Crémeuse sans crème, comme à Rome.", price: 15.9, tags: ["populaire"], options: ["pates"] },
  { id: "pas-pesto", category: "pasta", name: "Pasta al Pesto", description: "Pesto de basilic maison, pignons torréfiés, stracciatella et tomates cerises.", price: 14.5, tags: ["vege"], options: ["pates"] },
  { id: "pas-frutti", category: "pasta", name: "Frutti di Mare", description: "Moules, calamars, crevettes et palourdes, sauce tomate à l'ail et persil frais.", price: 18.9, tags: [], image: "/tavolata.jpg", options: ["pates"] },
  { id: "pas-arrabbiata", category: "pasta", name: "Arrabbiata", description: "Sauce tomate pimentée à l'ail, basilic et grana padano. Simple et efficace.", price: 12.9, tags: ["vege", "epice"], options: ["pates"] },
  // Risotto
  { id: "ris-funghi", category: "risotto", name: "Risotto ai Funghi", description: "Riz carnaroli, cèpes et champignons de Paris, grana padano et huile de truffe.", price: 16.9, tags: ["vege"] },
  { id: "ris-pistacchio", category: "risotto", name: "Risotto Pistacchio", description: "Crème de pistache, crevettes poêlées et zestes de citron. Notre signature.", price: 18.5, tags: ["populaire"] },
  // Piatti
  { id: "pia-milanese", category: "piatti", name: "Escalope Milanese", description: "Escalope de veau panée, citron, roquette et grana padano. Servie avec l'accompagnement de ton choix.", price: 19.9, tags: [], options: ["accompagnement"] },
  { id: "pia-tagliata", category: "piatti", name: "Tagliata di Manzo", description: "Bœuf halal grillé et tranché, roquette, tomates cerises, copeaux de grana et réduction balsamique.", price: 23.9, tags: ["populaire"], image: "/chef.jpg", options: ["accompagnement"] },
  { id: "pia-burrata", category: "piatti", name: "Burrata e Pomodori", description: "Burrata de 125 g, tomates anciennes, pesto et focaccia tiède. À partager ou pas.", price: 13.9, tags: ["vege"] },
  // Dolci
  { id: "dol-big-five", category: "dolci", name: "Big Five", description: "Cinq tiramisus, cinq parfums : Nutella, pistache, fraise, dattes et classique. À partager, ou pas.", price: 21.9, tags: ["populaire"], image: "/dolci.jpg" },
  { id: "dol-tiramisu", category: "dolci", name: "Tiramisu maison", description: "Mascarpone fouetté, biscuits imbibés de café et cacao amer. Choisis ton parfum.", price: 6.9, tags: [], image: "/dolci.jpg", options: ["parfum"] },
  { id: "dol-panna", category: "dolci", name: "Panna Cotta", description: "Crème vanille de Madagascar, coulis de fruits rouges frais.", price: 5.9, tags: ["vege"] },
  { id: "dol-pizza-nutella", category: "dolci", name: "Pizza Nutella", description: "Pâte maison au four à bois, Nutella, noisettes torréfiées et sucre glace. Pour 2.", price: 12.9, tags: ["vege"] },
  // Bevande
  { id: "bev-limonata", category: "bevande", name: "Limonata artigianale", description: "Limonade italienne au citron de Sicile, 33 cl.", price: 3.9, tags: [] },
  { id: "bev-aranciata", category: "bevande", name: "Aranciata rossa", description: "Soda à l'orange sanguine, 33 cl.", price: 3.9, tags: [] },
  { id: "bev-eau", category: "bevande", name: "San Pellegrino", description: "Eau minérale gazeuse, 50 cl.", price: 3.5, tags: [] },
  { id: "bev-cafe", category: "bevande", name: "Espresso", description: "Café italien serré, torréfaction napolitaine.", price: 2.2, tags: [] },
];

export const formatPrice = (n: number) =>
  n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

export const tagLabel: Record<Tag, string> = {
  populaire: "Populaire",
  vege: "Végé",
  epice: "Épicé",
};
