export default function NotificationCard({ notification, onRead }) {
  return (
    <article>
      <h2>{notification.title}</h2>
      <p>{notification.message}</p>
      {notification.createdAt && (
        <time dateTime={notification.createdAt}>
          {new Date(notification.createdAt).toLocaleString()}
        </time>
      )}
      {!notification.read && onRead && (
        <button type="button" onClick={() => onRead(notification)}>
          Mark as read
        </button>
      )}
    </article>
  );
}