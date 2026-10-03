export default function PaymentCard({ payment, onView }) {
  return (
    <article>
      <h2>Payment #{payment.id}</h2>
      <p>Amount: ₹{payment.amount ?? 0}</p>
      <p>Status: {payment.status ?? "Pending"}</p>
      {onView && (
        <button type="button" onClick={() => onView(payment)}>
          View payment
        </button>
      )}
    </article>
  );
}