import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const ORDERS_KEY = "dairy_farm_orders";

function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) ?? [];
  } catch {
    return [];
  }
}

function isToday(value) {
  return value && new Date(value).toDateString() === new Date().toDateString();
}

function isThisMonth(value) {
  if (!value) return false;

  const date = new Date(value);
  const today = new Date();

  return (
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function money(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
}

export default function AnalyticsDashboard() {
  const [orders, setOrders] = useState(loadOrders);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const suppliedThisMonth = orders.filter(
    (order) => order.status === "Supplied" && isThisMonth(order.suppliedAt),
  );

  const litresToday = orders
    .filter((order) => order.status === "Supplied" && isToday(order.suppliedAt))
    .reduce((sum, order) => sum + Number(order.quantity || 0), 0);

  const litresThisMonth = suppliedThisMonth.reduce(
    (sum, order) => sum + Number(order.quantity || 0),
    0,
  );

  const incomeThisMonth = suppliedThisMonth.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0,
  );

  const acceptedThisMonth = orders.filter(
    (order) => isThisMonth(order.acceptedAt),
  ).length;

  function changeOrderStatus(orderId, status) {
    const now = new Date().toISOString();

    const updatedOrders = orders.map((order) => {
      if (order.id !== orderId) return order;

      return status === "Accepted"
        ? { ...order, status, acceptedAt: now }
        : { ...order, status: "Supplied", suppliedAt: now };
    });

    localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  }

  function handleSignOut() {
    signOut();
    navigate("/login", { replace: true });
  }

  return (
    <main className="admin-dashboard">
      <header className="customer-header">
        <div>
          <img
            className="app-logo"
            src="/logo.png"
            alt="Diary Farm logo"
          />
          <h1>Admin Dashboard</h1>
          <p>
            Welcome, {user?.email ?? "Admin"}. Here is your milk supply summary.
          </p>
        </div>

        <button
          className="secondary-button"
          type="button"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </header>

      <section className="admin-stats">
        <article>
          <span>Milk supplied today</span>
          <strong>{litresToday} Ltr</strong>
        </article>

        <article>
          <span>Milk supplied this month</span>
          <strong>{litresThisMonth} Ltr</strong>
        </article>

        <article>
          <span>Income from supply this month</span>
          <strong>{money(incomeThisMonth)}</strong>
        </article>

        <article>
          <span>Orders accepted this month</span>
          <strong>{acceptedThisMonth}</strong>
        </article>
      </section>

      <section className="customer-panel">
        <h2>Customer orders</h2>

        {orders.length === 0 ? (
          <p>No customer orders yet.</p>
        ) : (
          <div className="admin-order-list">
            {orders.map((order) => (
              <article className="admin-order" key={order.id}>
                <div>
                  <strong>
                    {order.product} — {order.quantity} Ltr
                  </strong>
                  <p>Customer: {order.customerEmail ?? "Customer"}</p>
                  <p>Order total: {money(order.total)}</p>
                  <p>Status: {order.status ?? "Received"}</p>
                </div>

                <div className="admin-order-actions">
                  {(!order.status || order.status === "Received") && (
                    <button
                      type="button"
                      onClick={() => changeOrderStatus(order.id, "Accepted")}
                    >
                      Accept order
                    </button>
                  )}

                  {order.status === "Accepted" && (
                    <button
                      type="button"
                      onClick={() => changeOrderStatus(order.id, "Supplied")}
                    >
                      Mark supplied
                    </button>
                  )}

                  {order.status === "Supplied" && (
                    <span className="admin-supplied-label">Supplied</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}