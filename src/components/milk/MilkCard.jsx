// MilkCard.jsx
export default function MilkCard({
  name,
  description,
  price,
  image,
  quantity,
  onAddToCart,
}) {
  return (
    <article>
      {image && <img src={image} alt={name} />}
      <h2>{name}</h2>
      {description && <p>{description}</p>}
      <p>₹{price} per unit</p>
      {onAddToCart && (
        <button type="button" onClick={onAddToCart}>
          Add to cart{quantity ? ` (${quantity})` : ""}
        </button>
      )}
    </article>
  );
}