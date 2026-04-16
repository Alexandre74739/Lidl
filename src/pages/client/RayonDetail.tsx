import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ChevronRight } from "lucide-react";
import { getCategoryById, type Category } from "../../services/categoryService";
import { getProducts, type Product } from "../../services/productService";
import ProductCard from "../../components/ui/ProductCard";

export default function RayonDetail() {
  const { id } = useParams<{ id: string }>();
  const categoryId = Number(id);

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId) return;
    setLoading(true);

    Promise.all([
      getCategoryById(categoryId),
      getProducts(),
    ])
      .then(([cat, allProducts]) => {
        setCategory(cat);
        setProducts(allProducts.filter((p) => p.category_id === categoryId));
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [categoryId]);

  return (
    <main className="rayon-detail">
      {/* Breadcrumb */}
      <nav className="rayon-detail__breadcrumb container" aria-label="Fil d'Ariane">
        <Link to="/">Accueil</Link>
        <ChevronRight size={14} />
        <Link to="/rayons">Rayons</Link>
        <ChevronRight size={14} />
        <span className="rayon-detail__breadcrumb-current">
          {category?.name ?? "Chargement..."}
        </span>
      </nav>

      <div className="rayon-detail__header container">
        <h1 className="rayon-detail__title">{category?.name}</h1>
        {category?.description && (
          <p className="rayon-detail__desc">{category.description}</p>
        )}
      </div>

      <div className="rayon-detail__content container">
        {loading && <p className="rayon-detail__status">Chargement des produits...</p>}
        {error && <p className="rayon-detail__status rayon-detail__status--error">Erreur : {error}</p>}

        {!loading && !error && products.length === 0 && (
          <p className="rayon-detail__status">Aucun produit dans ce rayon pour le moment.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <p className="rayon-detail__count">{products.length} produit(s)</p>
            <div className="rayon-detail__grid">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  description={p.description}
                  subtitle={p.category?.name}
                  image={p.image_url ?? ""}
                  price={p.price}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
