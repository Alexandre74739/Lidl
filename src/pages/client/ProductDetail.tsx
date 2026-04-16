import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ChevronRight, Truck, BadgeCheck } from "lucide-react";
import { getProductById, type Product } from "../../services/productService";
import { useCart } from "../../services/CartContext";
import Quantity from "../../components/ui/Quantity";
import NutriScore from "../../components/product/NutriScore";
import ConseilDuChef from "../../components/product/ConseilDuChef";
import AvisSection from "../../components/product/AvisSection";
import ProduitsSimilaires from "../../components/product/ProduitsSimilaires";
import PourAccompagner from "../../components/product/PourAccompagner";

const PROMO_DISCOUNT = 0.20;

function applyPromo(price: number) {
  return Math.round(price * (1 - PROMO_DISCOUNT) * 100) / 100;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { getQuantity, setQuantity } = useCart();
  const quantity = product ? getQuantity(productId) : 0;

  const hasPromo = true; // à brancher sur un vrai champ back plus tard

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
    const price = hasPromo ? applyPromo(product.price) : product.price;
    setQuantity(
      {
        id: productId,
        name: product.name,
        price,
        originalPrice: hasPromo ? product.price : undefined,
        image: product.image_url ?? "",
        description: product.description,
        subtitle: product.category?.name,
      },
      q
    );
  };

  if (loading) return <div className="product-detail__loading container">Chargement du produit...</div>;
  if (error || !product) return <div className="product-detail__error container">Produit introuvable.</div>;

  const promoPrice = hasPromo ? applyPromo(product.price) : product.price;
  const pricePerKg = product.weight && product.weight > 0
    ? promoPrice / product.weight
    : null;

  return (
    <main className="product-detail">
      {/* Breadcrumb */}
      <nav className="product-detail__breadcrumb container" aria-label="Fil d'Ariane">
        <Link to="/">Accueil</Link>
        <ChevronRight size={14} />
        {product.category && (
          <>
            <Link to={`/rayons/${product.category.id}`}>{product.category.name}</Link>
            <ChevronRight size={14} />
          </>
        )}
        <span className="product-detail__breadcrumb-current">{product.name}</span>
      </nav>

      {/* Hero */}
      <div className="product-detail__hero container">

        {/* Image */}
        <div className="product-detail__gallery">
          {hasPromo && <span className="product-detail__promo-badge">Promo</span>}
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="product-detail__image" />
          ) : (
            <div className="product-detail__image-placeholder" />
          )}
        </div>

        {/* Infos */}
        <div className="product-detail__info">

          <h1 className="product-detail__name">{product.name}</h1>
          
          {/* Ligne méta */}
          <p className="product-detail__meta">
            {product.weight && <span>{product.weight < 1 ? `${product.weight * 1000}g` : `${product.weight}kg`}</span>}
            {product.weight && product.category && <span className="product-detail__meta-sep">—</span>}
            {product.category && <span>{product.category.name}</span>}
            <span className="product-detail__meta-sep">—</span>
            <span>🇫🇷 Origine : France</span>
          </p>


          {/* Nutri-Score */}
          {product.nutriscore && <NutriScore score={product.nutriscore} />}

          {/* Prix */}
          <div className="product-detail__pricing">
            <div className="product-detail__price-row">
              <span className="product-detail__price">{promoPrice.toFixed(2).replace(".", ",")} €</span>
              {hasPromo && (
                <span className="product-detail__price-original">
                  {product.price.toFixed(2).replace(".", ",")} €
                </span>
              )}
            </div>
            {pricePerKg && (
              <p className="product-detail__price-kg">
                soit {pricePerKg.toFixed(2).replace(".", ",")} € / kg
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="product-detail__actions">
            <div className={`product-detail__qty-wrap${quantity > 0 ? " product-detail__qty-wrap--visible" : ""}`}>
              <Quantity value={quantity} onChange={handleQuantity} />
            </div>
            <button
              className="product-detail__add-btn"
              onClick={() => handleQuantity(quantity === 0 ? 1 : quantity)}
            >
              {quantity === 0 ? "Ajouter au panier" : "Dans le panier"}
            </button>
          </div>

          {/* Badges services */}
          <div className="product-detail__badges">
            <span className="product-detail__badge-item">
              <Truck size={14} aria-hidden />
              Livraison express
            </span>
            <span className="product-detail__badge-item">
              <BadgeCheck size={14} aria-hidden />
              Garantie fraîcheur
            </span>
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
        <ProduitsSimilaires categoryId={product.category?.id} currentProductId={productId} />
      </div>

      {/* Pour accompagner */}
      <div className="container">
        <PourAccompagner currentProductId={productId} />
      </div>
    </main>
  );
}
