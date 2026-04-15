import { useEffect, useState } from "react";
import { getProducts, type Product } from "../../services/productService";
import ProductCard from "../ui/ProductCard";

interface Props {
  categoryId?: number;
  currentProductId: number;
}

export default function ProduitsSimilaires({ categoryId, currentProductId }: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((all) => {
        const filtered = all.filter(
          (p) =>
            p.id !== currentProductId &&
            (categoryId ? p.category_id === categoryId : true)
        );
        setProducts(filtered.slice(0, 4));
      })
      .catch(() => {});
  }, [categoryId, currentProductId]);

  if (products.length === 0) return null;

  return (
    <section className="produits-similaires">
      <h2 className="produits-similaires__title">Produits similaires</h2>
      <div className="produits-similaires__grid">
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
    </section>
  );
}
