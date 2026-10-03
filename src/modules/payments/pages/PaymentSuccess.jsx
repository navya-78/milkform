export default function PaymentSuccess({ paymentId }) {
  return (
    <main>
      <h1>Payment successful</h1>
      <p>Your payment has been received.</p>
      {paymentId && <p>Payment reference: {paymentId}</p>}
    </main>
  );
}