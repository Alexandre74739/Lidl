// ─── Types ────────────────────────────────────────────────────────────────────

export interface DrawerLink {
  label: string;
  to: string;
}

/** Catégorie avec sous-items (ouvre le panneau niveau 2) */
export interface DrawerItem {
  id: string;
  label: string;
  /** Emoji affiché dans l'icône circulaire */
  icon?: string;
  /** Lien direct si la catégorie n'a pas de sous-items */
  to?: string;
  /** Lien "Voir tout" affiché dans l'en-tête du sous-panneau */
  viewAllTo?: string;
  children?: DrawerLink[];
}

/** Section séparatrice avec titre + liste de liens directs */
export interface DrawerSection {
  sectionLabel: string;
  items: Array<{
    id: string;
    label: string;
    icon?: string;
    to: string;
  }>;
}

export type DrawerEntry = DrawerItem | DrawerSection;

/** Type guard */
export function isSection(entry: DrawerEntry): entry is DrawerSection {
  return "sectionLabel" in entry;
}

// ─── Données Lidl Click & Collect ─────────────────────────────────────────────

const drawerMenuData: DrawerEntry[] = [
  {
    id: "fruits-legumes",
    label: "Fruits & Légumes",
    icon: "🥦",
    viewAllTo: "/fruits-legumes",
    children: [
      { label: "Fruits frais",         to: "/fruits-legumes/fruits" },
      { label: "Légumes frais",        to: "/fruits-legumes/legumes" },
      { label: "Herbes aromatiques",   to: "/fruits-legumes/herbes" },
      { label: "Champignons",          to: "/fruits-legumes/champignons" },
      { label: "Bio",                  to: "/fruits-legumes/bio" },
    ],
  },
  {
    id: "boucherie-charcuterie",
    label: "Boucherie & Charcuterie",
    icon: "🥩",
    viewAllTo: "/boucherie",
    children: [
      { label: "Bœuf",         to: "/boucherie/boeuf" },
      { label: "Poulet",       to: "/boucherie/poulet" },
      { label: "Porc",         to: "/boucherie/porc" },
      { label: "Agneau",       to: "/boucherie/agneau" },
      { label: "Saucissons",   to: "/charcuterie/saucissons" },
      { label: "Jambons",      to: "/charcuterie/jambons" },
      { label: "Pâtés & Terrines", to: "/charcuterie/pates" },
    ],
  },
  {
    id: "poissonnerie",
    label: "Poissonnerie",
    icon: "🐟",
    viewAllTo: "/poissonnerie",
    children: [
      { label: "Poissons frais",   to: "/poissonnerie/frais" },
      { label: "Fruits de mer",    to: "/poissonnerie/fruits-de-mer" },
      { label: "Saumon fumé",      to: "/poissonnerie/saumon-fume" },
      { label: "Surgelés mer",     to: "/poissonnerie/surgeles" },
    ],
  },
  {
    id: "cremerie-fromage",
    label: "Crèmerie & Fromages",
    icon: "🧀",
    viewAllTo: "/cremerie",
    children: [
      { label: "Lait & Crème",    to: "/cremerie/lait" },
      { label: "Yaourts",         to: "/cremerie/yaourts" },
      { label: "Fromages",        to: "/cremerie/fromages" },
      { label: "Beurres",         to: "/cremerie/beurres" },
      { label: "Œufs",            to: "/cremerie/oeufs" },
    ],
  },
  {
    id: "boulangerie-patisserie",
    label: "Boulangerie & Pâtisserie",
    icon: "🥖",
    viewAllTo: "/boulangerie",
    children: [
      { label: "Pains & Baguettes", to: "/boulangerie/pains" },
      { label: "Viennoiseries",     to: "/boulangerie/viennoiseries" },
      { label: "Gâteaux",          to: "/boulangerie/gateaux" },
      { label: "Tartes",           to: "/boulangerie/tartes" },
    ],
  },
  {
    id: "epicerie",
    label: "Épicerie",
    icon: "🛒",
    viewAllTo: "/epicerie",
    children: [
      { label: "Conserves",        to: "/epicerie/conserves" },
      { label: "Pâtes & Riz",      to: "/epicerie/pates-riz" },
      { label: "Huiles & Sauces",  to: "/epicerie/huiles-sauces" },
      { label: "Céréales & Petit-déjeuner", to: "/epicerie/cereales" },
      { label: "Snacking & Apéro", to: "/epicerie/snacking" },
    ],
  },
  {
    id: "boissons",
    label: "Boissons",
    icon: "🥤",
    viewAllTo: "/boissons",
    children: [
      { label: "Eaux",             to: "/boissons/eaux" },
      { label: "Jus de fruits",    to: "/boissons/jus" },
      { label: "Sodas",            to: "/boissons/sodas" },
      { label: "Vins",             to: "/boissons/vins" },
      { label: "Bières",           to: "/boissons/bieres" },
      { label: "Café & Thé",       to: "/boissons/cafe-the" },
    ],
  },
  {
    id: "surgeles",
    label: "Surgelés",
    icon: "❄️",
    viewAllTo: "/surgeles",
    children: [
      { label: "Pizzas & Snacks",  to: "/surgeles/pizzas" },
      { label: "Légumes surgelés", to: "/surgeles/legumes" },
      { label: "Glaces & Sorbets", to: "/surgeles/glaces" },
      { label: "Plats cuisinés",   to: "/surgeles/plats" },
    ],
  },
  {
    sectionLabel: "Services Lidl",
    items: [
      { id: "click-collect", label: "Click & Collect",  icon: "🏪", to: "/click-collect" },
      { id: "lidl-plus",     label: "Carte Lidl Plus",  icon: "💳", to: "/lidl-plus" },
      { id: "promotions",    label: "Promotions",        icon: "🏷️", to: "/promotions" },
    ],
  },
];

export default drawerMenuData;
