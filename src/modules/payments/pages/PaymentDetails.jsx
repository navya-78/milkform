export default function PaymentDetails({ payment }) {
  if (!payment) return <p>Payment not found.</p>;

  return (
    <main>
      <h1>Payment #{payment.id}</h1>
      <p>Amount: ₹{payment.amount ?? 0}</p>
      <p>Status: {payment.status ?? "Pending"}</p>
      <p>Method: {payment.method ?? "—"}</p>
      {payment.createdAt && (
        <p>Paid on: {new Date(payment.createdAt).toLocaleString()}</p>
      )}
    </main>
  );
}