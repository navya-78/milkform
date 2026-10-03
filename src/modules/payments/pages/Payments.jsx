import PaymentCard from "../components/PaymentCard";

export default function Payments({ payments = [], onView }) {
  return (
    <main>
      <h1>Payments</h1>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        payments.map((payment) => (
          <PaymentCard key={payment.id} payment={payment} onView={onView} />
        ))
      )}
    </main>
  );
}