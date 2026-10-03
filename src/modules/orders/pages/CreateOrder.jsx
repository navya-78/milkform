import { useNavigate } from "react-router-dom";
import { createOrder } from "../orderService";

export default function CreateOrder() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const quantity = Number(values.quantity);
    const price = Number(values.price);

    const order = createOrder({
      product: values.product,
      quantity,
      address: values.address,
      total: quantity * price,
    });

    navigate(`/user/orders/${order.id}`);
  }

  return (
    <main>
      <h1>Place an Order</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Milk product
          <select name="product" required>
            <option value="Fresh Milk">Fresh Milk</option>
            <option value="Organic Milk">Organic Milk</option>
            <option value="Full Cream Milk">Full Cream Milk</option>
          </select>
        </label>

        <label>
          Quantity (litres)
          <input name="quantity" type="number" min="1" defaultValue="1" required />
        </label>

        <label>
          Price per litre (₹)
          <input name="price" type="number" min="1" defaultValue="60" required />
        </label>

        <label>
          Delivery address
          <textarea name="address" required />
        </label>

        <button type="submit">Place order</button>
      </form>
    </main>
  );
}