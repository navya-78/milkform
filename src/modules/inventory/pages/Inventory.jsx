import InventoryCard from "../components/InventoryCard";

export default function Inventory({ products = [], onEdit, onDelete }) {
  return (
    <main>
      <h1>Inventory</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <InventoryCard
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </main>
  );
}