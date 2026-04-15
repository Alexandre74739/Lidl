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
    image: "https://picsum.photos/seed/apero/600/400",
    to: "/ambiances/apero",
  },
  {
    id: "chandelles",
    label: "Dîner aux chandelles",
    image: "https://picsum.photos/seed/chandelles/600/400",
    to: "/ambiances/chandelles",
  },
  {
    id: "brunch",
    label: "Brunch du Dimanche",
    image: "https://picsum.photos/seed/brunch/600/400",
    to: "/ambiances/brunch",
  },
  {
    id: "pique-nique",
    label: "Pique-nique en famille",
    image: "https://picsum.photos/seed/piquenique/600/400",
    to: "/ambiances/pique-nique",
  },
  {
    id: "match",
    label: "Soirée Match",
    image: "https://picsum.photos/seed/match/600/400",
    to: "/ambiances/match",
  },
  {
    id: "detente",
    label: "Pause Détente",
    image: "https://picsum.photos/seed/detente/600/400",
    to: "/ambiances/detente",
  },
];

export default ambiancesData;
