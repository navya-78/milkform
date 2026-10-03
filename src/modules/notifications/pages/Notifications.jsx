import NotificationCard from "../components/NotificationCard";

export default function Notifications({ notifications = [], onRead }) {
  return (
    <main>
      <h1>Notifications</h1>
      {notifications.length === 0 ? (
        <p>You have no notifications.</p>
      ) : (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onRead={onRead}
          />
        ))
      )}
    </main>
  );
}