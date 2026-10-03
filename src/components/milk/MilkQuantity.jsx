// MilkQuantity.jsx
export default function MilkQuantity({
  quantity,
  onChange,
  min = 0,
  max = Infinity,
}) {
  const decrease = () => {
    if (quantity > min) onChange(quantity - 1);
  };

  const increase = () => {
    if (quantity < max) onChange(quantity + 1);
  };

  return (
    <div aria-label="Milk quantity">
      <button
        type="button"
        onClick={decrease}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span aria-live="polite">{quantity}</span>
      <button
        type="button"
        onClick={increase}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}