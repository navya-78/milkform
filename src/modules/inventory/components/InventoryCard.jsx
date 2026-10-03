export default function InventoryCard({ product, onEdit, onDelete }) {
  return (
    <article>
      <h2>{product.name}</h2>
      {product.description && <p>{product.description}</p>}
      <p>Price: ₹{product.price}</p>
      <p>In stock: {product.quantity}</p>
      {onEdit && (
        <button type="button" onClick={() => onEdit(product)}>
          Edit
        </button>
      )}
      {onDelete && (
        <button type="button" onClick={() => onDelete(product)}>
          Delete
        </button>
      )}
    </article>
  );
}