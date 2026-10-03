export default function SubscriptionDetails({ subscription }) {
  if (!subscription) return <p>Subscription not found.</p>;

  return (
    <main>
      <h1>{subscription.productName ?? "Subscription"}</h1>
      <p>Quantity: {subscription.quantity ?? 0}</p>
      <p>Frequency: {subscription.frequency ?? "—"}</p>
      <p>Status: {subscription.status ?? "Active"}</p>
      {subscription.nextDelivery && (
        <p>Next delivery: {subscription.nextDelivery}</p>
      )}
    </main>
  );
}