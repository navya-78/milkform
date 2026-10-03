export default function UserCard({ user, onView }) {
  return (
    <article>
      <h2>{user.name}</h2>
      <p>Email: {user.email ?? "—"}</p>
      <p>Role: {user.role ?? "Customer"}</p>
      {onView && (
        <button type="button" onClick={() => onView(user)}>
          View profile
        </button>
      )}
    </article>
  );
}