import UserCard from "../components/UserCard";

export default function Users({ users = [], onView }) {
  return (
    <main>
      <h1>Users</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <UserCard key={user.id} user={user} onView={onView} />
        ))
      )}
    </main>
  );
}