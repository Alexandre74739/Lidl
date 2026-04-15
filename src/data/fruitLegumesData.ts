export interface FruitLegumeProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  promotion?: string;
  image: string;
}

export const fruitLegumesProducts: FruitLegumeProduct[] = [
  {
    id: 101,
    name: "Tomates grappe Bio",
    description: "Origine France · 500g",
    price: 1.49,
    originalPrice: 3.40,
    promotion: "PROMO",
    image: "/products/products (1).png",
  },
  {
    id: 102,
    name: "Fraises Gariguette",
    description: "Origine Lot-et-Garonne · 250g",
    price: 2.99,
    originalPrice: 3.60,
    promotion: "PROMO",
    image: "/products/products (2).png",
  },
  {
    id: 103,
    name: "Avocat Hass mûr",
    description: "L'unité",
    price: 0.89,
    originalPrice: 1.25,
    promotion: "PROMO",
    image: "/products/products (3).png",
  },
  {
    id: 104,
    name: "Carottes fane",
    description: "Origine France · La botte",
    price: 1.20,
    image: "/products/products (4).png",
  },
  {
    id: 105,
    name: "Myrtilles sauvages",
    description: "Barquette de 125g",
    price: 2.45,
    image: "/products/products (5).png",
  },
  {
    id: 106,
    name: "Concombre Noa",
    description: "L'unité",
    price: 0.95,
    image: "/products/products (6).png",
  },
  {
    id: 107,
    name: "Pommes Gala",
    description: "Sachet de 1,5kg",
    price: 2.15,
    image: "/products/products (7).png",
  },
  {
    id: 108,
    name: "Ananas Victoria",
    description: "L'unité · Île de la Réunion",
    price: 3.50,
    image: "/products/products (8).png",
  },
  {
    id: 109,
    name: "Courgettes",
    description: "Origine France · 500g",
    price: 1.20,
    image: "/products/products (10).png",
  },
  {
    id: 110,
    name: "Fraises Gariguette",
    description: "Origine Lot-et-Garonne · 250g",
    price: 1.20,
    image: "/products/products (2).png",
  },
  {
    id: 111,
    name: "Avocat Hass mûr",
    description: "L'unité",
    price: 1.20,
    image: "/products/products (3).png",
  },
  {
    id: 112,
    name: "Carottes fane",
    description: "Origine France · La botte",
    price: 1.20,
    image: "/products/products (4).png",
  },
];

export interface SidebarCategory {
  id: string;
  label: string;
  active?: boolean;
}

export const sidebarCategories: SidebarCategory[] = [
  { id: "fruits-legumes", label: "Fruits & Légumes", active: true },
  { id: "boucherie", label: "Boucherie / Poissonnerie" },
  { id: "produits-laitiers", label: "Produits laitiers" },
  { id: "boulangerie", label: "Boulangerie" },
  { id: "epicerie-salee", label: "Épicerie salée" },
  { id: "epicerie-sucree", label: "Épicerie sucrée" },
  { id: "boissons", label: "Boissons" },
];
