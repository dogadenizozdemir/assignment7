import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../store/cartStore';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useEffect } from 'react';

export const NavBar = () => {
  const { user, dispatch } = useAuth();
  const itemCount = useCartStore((state) => 
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
  const [theme, setTheme] = useLocalStorage('theme_preference', 'light');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>Products</NavLink>
        {user && (
          <NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''}>
            Cart ({itemCount})
          </NavLink>
        )}
      </div>
      <div className="nav-actions">
        <button onClick={toggleTheme}>Toggle {theme === 'light' ? 'Dark' : 'Light'}</button>
        {user ? (
          <>
            <span>{user.username}</span>
            <button onClick={() => dispatch({ type: 'LOGGED_OUT' })}>Logout</button>
          </>
        ) : (
          <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink>
        )}
      </div>
    </nav>
  );
};