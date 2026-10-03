import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const ORDERS_KEY = "dairy_farm_orders";
const SUBSCRIPTION_KEY = "dairy_farm_subscription";
const PRICE_PER_LITRE = 60;

function readSavedValue(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

export default function UserDashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState(() =>
    readSavedValue(ORDERS_KEY, []),
  );
  const [subscription, setSubscription] = useState(() =>
    readSavedValue(SUBSCRIPTION_KEY, null),
  );
  const [message, setMessage] = useState("");

  function placeOrder(event) {
    event.preventDefault();

    const values = new FormData(event.currentTarget);
    const quantity = Number(values.get("quantity"));
    const product = String(values.get("product"));

    const order = {
      id: `DF-${Date.now()}`,
      product,
      quantity,
      total: quantity * PRICE_PER_LITRE,
      status: "Received",
      paymentStatus: "Unpaid",
      createdAt: new Date().toISOString(),
      customerEmail: user?.email ?? "",
    };

    const updatedOrders = [order, ...orders];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    setMessage("Your order has been placed.");
    event.currentTarget.reset();
  }

  function recordDemoPayment(orderId) {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            paymentStatus: "Paid (demo)",
            paidAt: new Date().toISOString(),
            receiptId: `RCPT-${Date.now()}`,
          }
        : order,
    );

    localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  }

  function saveSubscription(event) {
    event.preventDefault();

    const values = new FormData(event.currentTarget);
    const quantity = Number(values.get("quantity"));
    const daysPerWeek = Number(values.get("daysPerWeek"));

    const savedSubscription = {
      quantity,
      daysPerWeek,
      monthlyEstimate: Math.round(
        quantity * PRICE_PER_LITRE * daysPerWeek * 4.33,
      ),
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      SUBSCRIPTION_KEY,
      JSON.stringify(savedSubscription),
    );
    setSubscription(savedSubscription);
    setMessage("Your monthly subscription has been saved.");
  }

  const totalOrdered = orders.reduce(
    (total, order) => total + Number(order.quantity || 0),
    0,
  );

  return (
    <main className="customer-dashboard">
      <header className="customer-header">
        <div>
     <img
  className="app-logo"
  src="/images/logo.png"
  alt="Diary Farm logo"
/>
          <h1>Diary Farm</h1>
          <p>Welcome, {user?.email ?? "Customer"}</p>
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

      <section className="customer-summary">
        <article>
          <span>Milk ordered so far</span>
          <strong>{totalOrdered} Ltr</strong>
        </article>

        <article>
          <span>Previous orders</span>
          <strong>{orders.length}</strong>
        </article>

        <article>
          <span>Monthly subscription</span>
          <strong>
            {subscription
              ? `₹${subscription.monthlyEstimate}`
              : "Not set"}
          </strong>
        </article>
      </section>

      <section className="customer-panel">
        <h2>Order milk</h2>

        <form className="customer-form" onSubmit={placeOrder}>
          <label>
            Milk type
            <select name="product" defaultValue="Fresh Milk">
              <option>Fresh Milk</option>
              <option>Organic Milk</option>
              <option>Full Cream Milk</option>
            </select>
          </label>

          <label>
            Quantity in litres
            <input
              name="quantity"
              type="number"
              min="1"
              max="50"
              defaultValue="1"
              required
            />
          </label>

          <p>Price: ₹{PRICE_PER_LITRE} per litre</p>
          <button type="submit">Place order</button>
        </form>

        {message && <p className="customer-message">{message}</p>}
      </section>

      <section className="customer-panel">
        <h2>Monthly milk subscription</h2>

        <form className="customer-form" onSubmit={saveSubscription}>
          <label>
            Litres per delivery
            <input
              name="quantity"
              type="number"
              min="1"
              defaultValue={subscription?.quantity ?? 1}
              required
            />
          </label>

          <label>
            Delivery days per week
            <select
              name="daysPerWeek"
              defaultValue={subscription?.daysPerWeek ?? 3}
            >
              <option value="3">3 days per week</option>
              <option value="5">5 days per week</option>
              <option value="7">Every day</option>
            </select>
          </label>

          <button type="submit">Save subscription</button>
        </form>

        {subscription && (
          <p>
            Estimated monthly cost:{" "}
            <strong>₹{subscription.monthlyEstimate}</strong>
          </p>
        )}
      </section>

      <section className="customer-panel">
        <h2>Order history and payment receipts</h2>

        {orders.length === 0 ? (
          <p>
            You haven’t placed any orders yet. Place your first milk order
            above.
          </p>
        ) : (
          <div className="customer-orders">
            {orders.map((order) => (
              <article className="customer-order" key={order.id}>
                <div>
                  <strong>
                    {order.product} — {order.quantity} Ltr
                  </strong>
                  <p>Order: {new Date(order.createdAt).toLocaleString()}</p>
                  <p>Total: ₹{order.total} · Status: {order.status}</p>
                  <p>Payment: {order.paymentStatus}</p>
                </div>

                {order.receiptId ? (
                  <div className="receipt">
                    <strong>Demo payment receipt</strong>
                    <span>Receipt: {order.receiptId}</span>
                    <span>Amount paid: ₹{order.total}</span>
                    <button type="button" onClick={() => window.print()}>
                      Print receipt
                    </button>
                  </div>
                ) : (
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() => recordDemoPayment(order.id)}
                  >
                    Record demo payment
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