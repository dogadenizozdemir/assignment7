import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { fetchProduct } from '../api/productsApi';
import { useCartStore } from '../store/cartStore';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  
  const { data, loading, error } = useFetch((signal) => fetchProduct(id, signal), [id]);

  if (loading) return <div className="loading">Loading product...</div>;
  if (error) return <div className="error">Product not found</div>;
  if (!data) return null;

  return (
    <div className="product-detail-page">
      <button onClick={() => navigate('/products')} className="back-btn">Back</button>
      <div className="detail-content">
        <img src={data.thumbnail} alt={data.title} />
        <div className="info">
          <h2>{data.title}</h2>
          <p className="category">{data.category}</p>
          <p className="description">{data.description}</p>
          <p className="price">${data.price}</p>
          <button onClick={() => addItem(data)}>Add to cart</button>
          <button onClick={() => navigate(`/products/${Number(id) + 1}`)}>Next Product</button>
        </div>
      </div>
    </div>
  );
};