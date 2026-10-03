import { Link, Outlet } from "react-router-dom";

export default function DeliveryBoyLayout() {
  return (
    <>
      <header>
        <Link to="/delivery">Delivery Dashboard</Link>
        <nav>
          <Link to="/delivery/tasks">Assigned deliveries</Link>
          <Link to="/delivery/profile">Profile</Link>
        </nav>
      </header>
      <main><Outlet /></main>
    </>
  );
}