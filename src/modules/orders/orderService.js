export function markOrderSupplied(id) {
  const orders = readOrders();
  const updatedOrders = orders.map((order) =>
    order.id === id
      ? {
          ...order,
          status: "Supplied",
          suppliedAt: new Date().toISOString(),
        }
      : order,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
  return updatedOrders.find((order) => order.id === id);
}