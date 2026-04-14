export interface SubItem {
  label: string;
  to: string;
}

export interface RangeItem {
  label: string;
  to?: string;
  children?: SubItem[];
}

export interface MenuCategory {
  id: string;
  label: string;
  items: RangeItem[];
}

const menuData: MenuCategory[] = [
  {
    id: "alimentation",
    label: "Alimentation",

    items: [
      {
        label: "Bio",
        children: [
          { label: "Fruits & Légumes", to: "/bio/fruits-legumes" },
          { label: "Produits laitiers", to: "/bio/laitiers" },
          { label: "Cosmétique", to: "/bio/cosmetique" },
          { label: "Habillement", to: "/bio/habillement" },
        ],
      },
      {
        label: "Poissonnerie",
        children: [
          { label: "Poissons frais", to: "/poissonnerie/frais" },
          { label: "Fruits de mer", to: "/poissonnerie/fruits-de-mer" },
          { label: "Surgelés", to: "/poissonnerie/surgeles" },
        ],
      },
      {
        label: "Boucherie",
        children: [
          { label: "Bœuf", to: "/boucherie/boeuf" },
          { label: "Poulet", to: "/boucherie/poulet" },
          { label: "Porc", to: "/boucherie/porc" },
          { label: "Agneau", to: "/boucherie/agneau" },
        ],
      },
      { label: "Épicerie", to: "/epicerie" },
      { label: "Boissons", to: "/boissons" },
    ],
  },
  {
    id: "bricolage",
    label: "Bricolage",

    items: [
      {
        label: "Outillage",
        children: [
          { label: "Outils à main", to: "/bricolage/outils-main" },
          { label: "Électroportatif", to: "/bricolage/electroportatif" },
          { label: "Mesure & Traçage", to: "/bricolage/mesure" },
        ],
      },
      {
        label: "Peinture",
        children: [
          { label: "Peintures murales", to: "/peinture/murales" },
          { label: "Sous-couches", to: "/peinture/sous-couches" },
          { label: "Accessoires", to: "/peinture/accessoires" },
        ],
      },
      { label: "Fixation & Visserie", to: "/bricolage/fixation" },
      { label: "Électricité", to: "/bricolage/electricite" },
    ],
  },
  {
    id: "jardin",
    label: "Jardin",

    items: [
      {
        label: "Plantes",
        children: [
          { label: "Plantes d'intérieur", to: "/jardin/interieur" },
          { label: "Plantes d'extérieur", to: "/jardin/exterieur" },
          { label: "Graines & Bulbes", to: "/jardin/graines" },
        ],
      },
      { label: "Mobilier de jardin", to: "/jardin/mobilier" },
      { label: "Arrosage", to: "/jardin/arrosage" },
      { label: "Tondeuses & Taille", to: "/jardin/tondeuses" },
    ],
  },
  {
    id: "textile",
    label: "Textile",

    items: [
      {
        label: "Femme",
        children: [
          { label: "Hauts", to: "/textile/femme/hauts" },
          { label: "Pantalons", to: "/textile/femme/pantalons" },
          { label: "Robes", to: "/textile/femme/robes" },
        ],
      },
      {
        label: "Homme",
        children: [
          { label: "T-shirts", to: "/textile/homme/tshirts" },
          { label: "Pantalons", to: "/textile/homme/pantalons" },
          { label: "Vestes", to: "/textile/homme/vestes" },
        ],
      },
      {
        label: "Enfant",
        children: [
          { label: "Bébé (0–2 ans)", to: "/textile/enfant/bebe" },
          { label: "Petite enfance", to: "/textile/enfant/petite-enfance" },
        ],
      },
    ],
  },
];

export default menuData;