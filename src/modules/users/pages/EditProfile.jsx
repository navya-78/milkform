import { updateProfile } from "../userService";

export default function EditProfile({ user, onUpdated }) {
  if (!user) return <p>User not found.</p>;

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const changes = Object.fromEntries(formData.entries());

    try {
      const updated = await updateProfile(user.id, changes);
      onUpdated?.(updated);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <main>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" defaultValue={user.name} required />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            defaultValue={user.email}
            required
          />
        </label>
        <label>
          Phone
          <input name="phone" type="tel" defaultValue={user.phone} />
        </label>
        <button type="submit">Save profile</button>
      </form>
    </main>
  );
}