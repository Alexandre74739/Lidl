import type { Product } from '../services/productService';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div style={styles.card}>
      {product.image_url && (
        <img src={product.image_url} alt={product.name} style={styles.image} />
      )}
      <div style={styles.body}>
        <p style={styles.category}>{product.category?.name ?? 'Sans catégorie'}</p>
        <h3 style={styles.name}>{product.name}</h3>
        {product.description && <p style={styles.description}>{product.description}</p>}
        <p style={styles.price}>{Number(product.price).toFixed(2)} €</p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,.08)',
  },
  image: {
    width: '100%',
    height: 160,
    objectFit: 'cover',
  },
  body: {
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  category: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#888',
    margin: 0,
  },
  name: {
    margin: 0,
    fontSize: 15,
    fontWeight: 600,
    color: '#1a1a1a',
  },
  description: {
    margin: 0,
    fontSize: 13,
    color: '#555',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  price: {
    margin: '8px 0 0',
    fontSize: 16,
    fontWeight: 700,
    color: '#114FCB',
  },
};
