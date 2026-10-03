import { Link, Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
      <header>
        <Link to="/">Dairy Farm</Link>
        <nav>
          <Link to="/user">Home</Link>
          <Link to="/user/orders">My orders</Link>
          <Link to="/user/subscriptions">Subscriptions</Link>
        </nav>
      </header>
      <main><Outlet /></main>
    </>
  );
}