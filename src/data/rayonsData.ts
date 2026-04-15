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
    image: "/products/products (1).png",
    subcategories: ["Fruits & Légumes", "Boucherie & Poissonnerie", "Épicerie Fine", "Produits Frais"],
  },
  {
    id: "hygiene",
    label: "Hygiène & Entretien",
    image: "/products/products (2).png",
    subcategories: ["Soin du corps", "Parfumerie", "Maison Éclatante", "Droguerie"],
  },
  {
    id: "bebe",
    label: "Bébé",
    image: "/products/products (3).png",
    subcategories: ["Alimentation Infantile", "Couches & Soins", "Éveil & Jouets"],
  },
  {
    id: "animaux",
    label: "Animaux",
    image: "/products/products (4).png",
    subcategories: ["Nutrition Canine", "Univers Félin", "Accessoires"],
  },
  {
    id: "textile",
    label: "Textile",
    image: "/products/products (5).png",
    subcategories: ["Prêt-à-porter", "Linge de Maison", "Chaussures"],
  },
  {
    id: "maison",
    label: "Maison",
    image: "/products/products (6).png",
    subcategories: ["Décoration", "Art de la Table", "Mobilier"],
  },
  {
    id: "electromenager",
    label: "Électroménager & Multimédia",
    image: "/products/products (7).png",
    subcategories: ["Petit Ménager", "High-Tech", "Cuisine Connectée"],
  },
  {
    id: "loisirs",
    label: "Loisirs & Équipements",
    image: "/products/products (8).png",
    subcategories: ["Sport & Outdoor", "Jardinage", "Bricolage Expert"],
  },
];

export default rayonsData;
