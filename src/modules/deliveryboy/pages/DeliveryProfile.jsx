import DeliveryBoyCard from "../components/DeliveryBoyCard";

export default function DeliveryProfile({ deliveryBoy }) {
  if (!deliveryBoy) return <p>Profile not found.</p>;

  return (
    <main>
      <h1>Delivery Profile</h1>
      <DeliveryBoyCard deliveryBoy={deliveryBoy} />
    </main>
  );
}