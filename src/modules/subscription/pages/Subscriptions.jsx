import SubscriptionCard from "../components/SubscriptionCard";

export default function Subscriptions({ subscriptions = [], onView }) {
  return (
    <main>
      <h1>Subscriptions</h1>
      {subscriptions.length === 0 ? (
        <p>No subscriptions found.</p>
      ) : (
        subscriptions.map((subscription) => (
          <SubscriptionCard
            key={subscription.id}
            subscription={subscription}
            onView={onView}
          />
        ))
      )}
    </main>
  );
}