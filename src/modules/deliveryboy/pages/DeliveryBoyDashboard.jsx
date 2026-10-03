import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const ORDERS_KEY = "dairy_farm_orders";
const EARNING_PER_DELIVERY = 20;

function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) ?? [];
  } catch {
    return [];
  }
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

export default function DeliveryBoyDashboard() {
  const [orders, setOrders] = useState(loadOrders);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const availableOrders = orders.filter(
    (order) => order.status === "Supplied" && !order.deliveryAgentEmail,
  );

  const myDeliveries = orders.filter(
    (order) => order.deliveryAgentEmail === user?.email,
  );

  const deliveredThisMonth = myDeliveries.filter(
    (order) => order.status === "Delivered" && isThisMonth(order.deliveredAt),
  );

  const earningsThisMonth = deliveredThisMonth.reduce(
    (sum, order) => sum + Number(order.deliveryEarning || EARNING_PER_DELIVERY),
    0,
  );

  function updateDelivery(orderId, action) {
    const now = new Date().toISOString();

    const updatedOrders = orders.map((order) => {
      if (order.id !== orderId) return order;

      if (action === "accept") {
        return {
          ...order,
          status: "Out for Delivery",
          deliveryAgentEmail: user.email,
          deliveryAcceptedAt: now,
        };
      }

      return {
        ...order,
        status: "Delivered",
        deliveredAt: now,
        deliveryEarning: EARNING_PER_DELIVERY,
      };
    });

    localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  }

  return (
    <main className="delivery-dashboard">
      <header className="customer-header">
        <div>
          <img
            className="app-logo"
            src="/images/logo.png"
            alt="Diary Farm logo"
          />
          <h1>Delivery Agent Dashboard</h1>
          <p>Signed in as {user?.email}</p>
        </div>

        <button
          className="secondary-button"
          type="button"
          onClick={() => {
            signOut();
            navigate("/login", { replace: true });
          }}
        >
          Sign out
        </button>
      </header>

      <section className="delivery-stats">
        <article>
          <span>Available deliveries</span>
          <strong>{availableOrders.length}</strong>
        </article>

        <article>
          <span>My completed deliveries this month</span>
          <strong>{deliveredThisMonth.length}</strong>
        </article>

        <article>
          <span>My delivery earnings this month</span>
          <strong>₹{earningsThisMonth.toLocaleString("en-IN")}</strong>
        </article>
      </section>

      <section className="customer-panel">
        <h2>Orders ready for delivery</h2>

        {availableOrders.length === 0 ? (
          <p>
            No orders are ready yet. The admin must mark an order as supplied
            first.
          </p>
        ) : (
          <div className="delivery-order-list">
            {availableOrders.map((order) => (
              <article className="delivery-order" key={order.id}>
                <div>
                  <strong>
                    {order.product} — {order.quantity} Ltr
                  </strong>
                  <p>Customer: {order.customerEmail ?? "Customer"}</p>
                  <p>Address: {order.address ?? "Address not provided"}</p>
                </div>

                <button
                  type="button"
                  onClick={() => updateDelivery(order.id, "accept")}
                >
                  Accept delivery
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="customer-panel">
        <h2>My deliveries</h2>

        {myDeliveries.length === 0 ? (
          <p>You haven’t accepted any deliveries yet.</p>
        ) : (
          <div className="delivery-order-list">
            {myDeliveries.map((order) => (
              <article className="delivery-order" key={order.id}>
                <div>
                  <strong>
                    {order.product} — {order.quantity} Ltr
                  </strong>
                  <p>Customer: {order.customerEmail ?? "Customer"}</p>
                  <p>Address: {order.address ?? "Address not provided"}</p>
                  <p>Status: {order.status}</p>

                  {order.status === "Delivered" && (
                    <p>
                      Earned: ₹
                      {Number(order.deliveryEarning || EARNING_PER_DELIVERY)}
                    </p>
                  )}
                </div>

                {order.status === "Out for Delivery" && (
                  <button
                    type="button"
                    onClick={() => updateDelivery(order.id, "delivered")}
                  >
                    Mark delivered
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}