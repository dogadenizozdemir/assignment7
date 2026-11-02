import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { fetchProducts } from '../api/productsApi';
import { ProductCard } from '../components/ProductCard';

export const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, loading, error } = useFetch(fetchProducts, []);

  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!data || !data.products) return <div className="empty">No products available.</div>;

  const categories = [...new Set(data.products.map(p => p.category))];

  const filteredProducts = data.products.filter(p => {
    const matchTitle = p.title.toLowerCase().includes(q.toLowerCase());
    const matchCategory = category ? p.category === category : true;
    return matchTitle && matchCategory;
  });

  const handleSearch = (e) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) newParams.set('q', e.target.value);
    else newParams.delete('q');
    setSearchParams(newParams);
  };

  const handleCategory = (e) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) newParams.set('category', e.target.value);
    else newParams.delete('category');
    setSearchParams(newParams);
  };

  return (
    <div className="product-list-page">
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search by title..." 
          value={q} 
          onChange={handleSearch} 
        />
        <select value={category} onChange={handleCategory}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      {filteredProducts.length === 0 ? (
        <p className="empty">No matching products found.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};