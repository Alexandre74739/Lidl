import ProductList from './components/ProductList';

export default function TestIntegPage() {
  const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Test Intégration Back</h1>
        <p style={styles.subtitle}>
          Connexion sur <code>{apiUrl}</code>
        </p>
      </header>

      <section>
        <h2 style={styles.sectionTitle}>GET /product</h2>
        <ProductList />
      </section>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '32px 16px',
    fontFamily: 'system-ui, sans-serif',
  },
  header: {
    marginBottom: 32,
    borderBottom: '2px solid #114FCB',
    paddingBottom: 16,
  },
  title: {
    margin: 0,
    fontSize: 24,
    color: '#114FCB',
  },
  subtitle: {
    margin: '8px 0 0',
    color: '#555',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    fontFamily: 'monospace',
  },
};
