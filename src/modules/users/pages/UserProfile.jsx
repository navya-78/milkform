export default function UserProfile({ user }) {
  if (!user) return <p>User not found.</p>;

  return (
    <main>
      <h1>{user.name}</h1>
      <p>Email: {user.email ?? "—"}</p>
      <p>Phone: {user.phone ?? "—"}</p>
      <p>Role: {user.role ?? "Customer"}</p>
    </main>
  );
}