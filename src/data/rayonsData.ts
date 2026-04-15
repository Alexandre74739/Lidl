export interface Rayon {
  id: string;
  label: string;
  image: string;
  subcategories: string[];
}

const rayonsData: Rayon[] = [
  {
    id: "alimentaire",
    label: "Alimentaire",
    image: "https://picsum.photos/seed/alimentaire/600/450",
    subcategories: ["Fruits & Légumes", "Boucherie & Poissonnerie", "Épicerie Fine", "Produits Frais"],
  },
  {
    id: "hygiene",
    label: "Hygiène & Entretien",
    image: "https://picsum.photos/seed/hygiene/600/450",
    subcategories: ["Soin du corps", "Parfumerie", "Maison Éclatante", "Droguerie"],
  },
  {
    id: "bebe",
    label: "Bébé",
    image: "https://picsum.photos/seed/bebe/600/450",
    subcategories: ["Alimentation Infantile", "Couches & Soins", "Éveil & Jouets"],
  },
  {
    id: "animaux",
    label: "Animaux",
    image: "https://picsum.photos/seed/animaux/600/450",
    subcategories: ["Nutrition Canine", "Univers Félin", "Accessoires"],
  },
  {
    id: "textile",
    label: "Textile",
    image: "https://picsum.photos/seed/textile/600/450",
    subcategories: ["Prêt-à-porter", "Linge de Maison", "Chaussures"],
  },
  {
    id: "maison",
    label: "Maison",
    image: "https://picsum.photos/seed/maison/600/450",
    subcategories: ["Décoration", "Art de la Table", "Mobilier"],
  },
  {
    id: "electromenager",
    label: "Électroménager & Multimédia",
    image: "https://picsum.photos/seed/electromenager/600/450",
    subcategories: ["Petit Ménager", "High-Tech", "Cuisine Connectée"],
  },
  {
    id: "loisirs",
    label: "Loisirs & Équipements",
    image: "https://picsum.photos/seed/loisirs/600/450",
    subcategories: ["Sport & Outdoor", "Jardinage", "Bricolage Expert"],
  },
];

export default rayonsData;
