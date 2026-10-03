export default function SubscriptionCard({ subscription, onView }) {
  return (
    <article>
      <h2>{subscription.productName ?? "Subscription"}</h2>
      <p>Quantity: {subscription.quantity ?? 0}</p>
      <p>Frequency: {subscription.frequency ?? "—"}</p>
      <p>Status: {subscription.status ?? "Active"}</p>
      {onView && (
        <button type="button" onClick={() => onView(subscription)}>
          View subscription
        </button>
      )}
    </article>
  );
}