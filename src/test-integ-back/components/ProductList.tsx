import { useEffect, useState } from 'react';
import { getProducts, type Product } from '../services/productService';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={styles.info}>Chargement des produits...</p>;
  if (error) return <p style={styles.error}>Erreur : {error}</p>;
  if (products.length === 0) return <p style={styles.info}>Aucun produit trouvé.</p>;

  return (
    <div>
      <p style={styles.count}>{products.length} produit(s) récupéré(s)</p>
      <div style={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 16,
  },
  count: {
    marginBottom: 16,
    color: '#555',
    fontSize: 13,
  },
  info: {
    color: '#555',
  },
  error: {
    color: '#c0392b',
    background: '#fdecea',
    padding: '12px 16px',
    borderRadius: 6,
  },
};
