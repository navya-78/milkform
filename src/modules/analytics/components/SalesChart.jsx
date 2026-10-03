export default function SalesChart({ data = [] }) {
  return (
    <section aria-label="Sales chart">
      <h2>Sales</h2>
      {data.length === 0 ? (
        <p>No sales data available.</p>
      ) : (
        <ul>
          {data.map((item, index) => (
            <li key={item.label ?? index}>
              {item.label ?? `Item ${index + 1}`}: {item.value ?? 0}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}