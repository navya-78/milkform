export default function RevenueCard({ amount = 0, currency = "₹" }) {
  const formattedAmount = Number(amount).toLocaleString("en-IN");

  return (
    <section aria-label="Revenue">
      <h2>Total Revenue</h2>
      <p>{currency}{formattedAmount}</p>
    </section>
  );
}