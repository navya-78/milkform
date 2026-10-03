import { createProduct } from "../inventoryService";

export default function AddProduct({ onCreated }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const product = Object.fromEntries(formData.entries());
    product.price = Number(product.price);
    product.quantity = Number(product.quantity);

    try {
      const created = await createProduct(product);
      form.reset();
      onCreated?.(created);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <main>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Product name
          <input name="name" required />
        </label>
        <label>
          Description
          <textarea name="description" />
        </label>
        <label>
          Price
          <input name="price" type="number" min="0" step="0.01" required />
        </label>
        <label>
          Quantity
          <input name="quantity" type="number" min="0" required />
        </label>
        <button type="submit">Add product</button>
      </form>
    </main>
  );
}