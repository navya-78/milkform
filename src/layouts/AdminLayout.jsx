import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <header>
        <Link to="/">Dairy Farm Admin</Link>
        <nav>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/admin/inventory">Inventory</Link>
        </nav>
      </header>
      <main><Outlet /></main>
    </>
  );
}