import { useEffect, useState } from "react";
import { getProducts, type Product } from "../../services/productService";
import ProductCard from "../ui/ProductCard";

interface Props {
  currentProductId: number;
}

export default function PourAccompagner({ currentProductId }: Props) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((all) => {
        // Prend quelques produits au hasard (hors produit courant)
        const pool = all.filter((p) => p.id !== currentProductId);
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        setProducts(shuffled.slice(0, 4));
      })
      .catch(() => {});
  }, [currentProductId]);

  if (products.length === 0) return null;

  return (
    <section className="pour-accompagner">
      <h2 className="pour-accompagner__title">Pour accompagner</h2>
      <div className="pour-accompagner__grid">
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
