export interface Ambiance {
  id: string;
  label: string;
  image: string;
  to: string;
}

const ambiancesData: Ambiance[] = [
  {
    id: "apero",
    label: "L'Apéro parfait",
    image: "/products/products (5).png",
    to: "/ambiances/apero",
  },
  {
    id: "chandelles",
    label: "Dîner aux chandelles",
    image: "/products/products (6).png",
    to: "/ambiances/chandelles",
  },
  {
    id: "brunch",
    label: "Brunch du Dimanche",
    image: "/products/products (7).png",
    to: "/ambiances/brunch",
  },
  {
    id: "pique-nique",
    label: "Pique-nique en famille",
    image: "/products/products (8).png",
    to: "/ambiances/pique-nique",
  },
  {
    id: "match",
    label: "Soirée Match",
    image: "https://nbjzohcoepdcocgcmwus.supabase.co/storage/v1/object/public/picture_url/pizza_surgele.avif",
    to: "/ambiances/match",
  },
  {
    id: "detente",
    label: "Pause Détente",
    image: "/products/products (10).png",
    to: "/ambiances/detente",
  },
];

export default ambiancesData;
