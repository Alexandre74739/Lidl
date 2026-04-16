import { useEffect, useState } from "react";
import { getCategories, type Category } from "../../services/categoryService";
import { getProducts } from "../../services/productService";
import RayonCard from "./RayonCard";

export default function RayonsGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageMap, setImageMap] = useState<Map<number, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getCategories(), getProducts()])
      .then(([cats, products]) => {
        setCategories(cats);

        const map = new Map<number, string>();
        for (const p of products) {
          if (p.category_id && p.image_url && !map.has(p.category_id)) {
            map.set(p.category_id, p.image_url);
          }
        }
        setImageMap(map);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="rayons-grid">
      <div className="rayons-grid__inner">
        <h2 className="rayons-grid__title">Parcourir nos rayons</h2>

        {loading && <p className="rayons-grid__status">Chargement des rayons...</p>}
        {error && <p className="rayons-grid__status rayons-grid__status--error">Erreur : {error}</p>}

        {!loading && !error && (
          <div className="rayons-grid__list">
            {categories.map((cat) => (
              <RayonCard
                key={cat.id}
                category={cat}
                image={imageMap.get(cat.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
