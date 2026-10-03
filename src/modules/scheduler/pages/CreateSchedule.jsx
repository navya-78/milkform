import { createSchedule } from "../schedulerService";

export default function CreateSchedule({ onCreated }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const schedule = Object.fromEntries(formData.entries());

    try {
      const created = await createSchedule(schedule);
      form.reset();
      onCreated?.(created);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <main>
      <h1>Create Schedule</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Frequency
          <select name="frequency" required defaultValue="">
            <option value="" disabled>Select frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
        <label>
          Start date
          <input name="startDate" type="date" required />
        </label>
        <button type="submit">Create schedule</button>
      </form>
    </main>
  );
}