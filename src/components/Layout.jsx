import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';

export const Layout = () => {
  return (
    <div className="layout-wrapper">
      <NavBar />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2026 E-commerce App</p>
      </footer>
    </div>
  );
};