
import { createSubscription } from "../subscriptionService";

export default function CreateSubscription({ onCreated }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const subscription = Object.fromEntries(formData.entries());
    subscription.quantity = Number(subscription.quantity);

    try {
      const created = await createSubscription(subscription);
      form.reset();
      onCreated?.(created);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <main>
      <h1>Create Subscription</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Product
          <input name="productName" required />
        </label>
        <label>
          Quantity
          <input name="quantity" type="number" min="1" required />
        </label>
        <label>
          Frequency
          <select name="frequency" required defaultValue="">
            <option value="" disabled>Select frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
        <button type="submit">Create subscription</button>
      </form>
    </main>
  );
}