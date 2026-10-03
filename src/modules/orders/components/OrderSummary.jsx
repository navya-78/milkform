export default function OrderSummary({ items = [], total }) {
  const calculatedTotal = items.reduce(
    (sum, item) => sum + Number(item.price ?? 0) * Number(item.quantity ?? 0),
    0,
  );

  return (
    <section>
      <h2>Order Summary</h2>
      {items.length === 0 ? (
        <p>No items in this order.</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={item.id ?? index}>
              {item.name} × {item.quantity} — ₹
              {Number(item.price ?? 0) * Number(item.quantity ?? 0)}
            </li>
          ))}
        </ul>
      )}
      <p>Total: ₹{total ?? calculatedTotal}</p>
    </section>
  );
}