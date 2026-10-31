import { Link } from 'react-router-dom';

export const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} loading="lazy" />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>{product.category}</p>
      <Link to={`/products/${product.id}`}>View Details</Link>
    </div>
  );
};