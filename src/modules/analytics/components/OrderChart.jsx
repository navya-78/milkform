export default function OrderChart({ data = [] }) {
  return (
    <section aria-label="Order chart">
      <h2>Orders</h2>
      {data.length === 0 ? (
        <p>No order data available.</p>
      ) : (
        <ul>
          {data.map((item, index) => (
            <li key={item.label ?? index}>
              {item.label ?? `Item ${index + 1}`}: {item.value ?? 0} orders
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}