import { updateProduct } from "../inventoryService";

export default function EditProduct({ product, onUpdated }) {
  if (!product) return <p>Product not found.</p>;

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const changes = Object.fromEntries(formData.entries());
    changes.price = Number(changes.price);
    changes.quantity = Number(changes.quantity);

    try {
      const updated = await updateProduct(product.id, changes);
      onUpdated?.(updated);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <main>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Product name
          <input name="name" defaultValue={product.name} required />
        </label>
        <label>
          Description
          <textarea name="description" defaultValue={product.description} />
        </label>
        <label>
          Price
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            defaultValue={product.price}
            required
          />
        </label>
        <label>
          Quantity
          <input
            name="quantity"
            type="number"
            min="0"
            defaultValue={product.quantity}
            required
          />
        </label>
        <button type="submit">Save changes</button>
      </form>
    </main>
  );
}