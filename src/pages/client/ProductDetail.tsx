import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { getProductById, type Product } from "../../services/productService";
import { useCart } from "../../services/CartContext";
import Quantity from "../../components/ui/Quantity";
import ConseilDuChef from "../../components/product/ConseilDuChef";
import AvisSection from "../../components/product/AvisSection";
import ProduitsSimilaires from "../../components/product/ProduitsSimilaires";
import PourAccompagner from "../../components/product/PourAccompagner";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { getQuantity, setQuantity } = useCart();
  const quantity = product ? getQuantity(productId) : 0;

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    getProductById(productId)
      .then(setProduct)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [productId]);

  const handleQuantity = (q: number) => {
    if (!product) return;
    setQuantity({ id: productId, name: product.name, price: product.price, image: product.image_url ?? "" }, q);
  };

  if (loading) return <div className="product-detail__loading container">Chargement du produit...</div>;
  if (error || !product) return <div className="product-detail__error container">Produit introuvable.</div>;

  return (
    <main className="product-detail">
      {/* Breadcrumb */}
      <nav className="product-detail__breadcrumb container" aria-label="Fil d'Ariane">
        <Link to="/">Accueil</Link>
        <ChevronRight size={14} />
        {product.category && (
          <>
            <span>{product.category.name}</span>
            <ChevronRight size={14} />
          </>
        )}
        <span className="product-detail__breadcrumb-current">{product.name}</span>
      </nav>

      {/* Hero : image + infos */}
      <div className="product-detail__hero container">
        {/* Image */}
        <div className="product-detail__gallery">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="product-detail__image" />
          ) : (
            <div className="product-detail__image-placeholder" />
          )}
        </div>

        {/* Infos */}
        <div className="product-detail__info">
          {product.category && (
            <span className="product-detail__origin">
              🇫🇷 {product.category.name}
            </span>
          )}

          <h1 className="product-detail__name">{product.name}</h1>

          {product.description && (
            <p className="product-detail__desc">{product.description}</p>
          )}

          <div className="product-detail__pricing">
            <span className="product-detail__price">
              {Number(product.price).toFixed(2).replace(".", ",")}€
            </span>
            <span className="product-detail__unit">/ unité</span>
          </div>

          <div className="product-detail__actions">
            {quantity === 0 ? (
              <button
                className="product-detail__add-btn"
                onClick={() => handleQuantity(1)}
              >
                <ShoppingCart size={18} aria-hidden />
                Ajouter au panier
              </button>
            ) : (
              <div className="product-detail__qty-row">
                <Quantity value={quantity} onChange={handleQuantity} />
                <button
                  className="product-detail__add-btn"
                  onClick={() => handleQuantity(quantity)}
                >
                  <ShoppingCart size={18} aria-hidden />
                  Dans le panier
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Détails + Avis */}
      <div className="product-detail__body container">
        <div className="product-detail__details">
          <h2 className="product-detail__section-title">Détails du produit</h2>
          <p className="product-detail__full-desc">
            {product.description ??
              "Produit sélectionné avec soin pour vous offrir le meilleur de la qualité Lidl. Cultivé dans le respect de l'environnement, ce produit vous garantit fraîcheur et saveur à chaque utilisation."}
          </p>
          <ConseilDuChef />
        </div>

        <AvisSection />
      </div>

      {/* Produits similaires */}
      <div className="container">
        <ProduitsSimilaires
          categoryId={product.category?.id}
          currentProductId={productId}
        />
      </div>

      {/* Pour accompagner */}
      <div className="container">
        <PourAccompagner currentProductId={productId} />
      </div>
    </main>
  );
}
