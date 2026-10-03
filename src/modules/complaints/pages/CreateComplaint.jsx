import { createComplaint } from "../complaintService";

export default function CreateComplaint({ onCreated }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const complaint = Object.fromEntries(formData.entries());

    try {
      const created = await createComplaint(complaint);
      event.currentTarget.reset();
      onCreated?.(created);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <main>
      <h1>Create a complaint</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input name="title" required />
        </label>
        <label>
          Description
          <textarea name="description" required />
        </label>
        <button type="submit">Submit complaint</button>
      </form>
    </main>
  );
}