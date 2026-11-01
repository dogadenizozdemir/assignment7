import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to our E-commerce Store</h1>
      <p>Find the best products at the best prices.</p>
      <Link to="/products" className="browse-btn">Browse Products</Link>
    </div>
  );
};