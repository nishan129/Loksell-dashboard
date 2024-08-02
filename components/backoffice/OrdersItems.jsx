import React, { useState } from 'react';

export default function OrdersItems({ row, accessorKey }) {
  const savedStatus = row.getValue(`${accessorKey}`);
  const orderId = row.original.id;
  const [status, setStatus] = useState(savedStatus);
  const [loading, setLoading] = useState(false);
  const orderItemsLength = row.original.orderItems.length;

  return (
    <div>
      <p>{orderItemsLength}</p>
      {/* Other UI components can go here */}
    </div>
  );
}
