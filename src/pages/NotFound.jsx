import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 - NotFound</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};