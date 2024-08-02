"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

// Enum for OrderStatus
const OrderStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELED: "CANCELED",
};

export default function OrderStatusComponent({ row, accessorKey }) {
  const savedStatus = row.getValue(`${accessorKey}`);
  const orderId = row.original.id;
  const [status, setStatus] = useState(savedStatus);
  const [loading, setLoading] = useState(false);

  async function handleChange(e) {
    const newStatus = e.target.value; // New status from the select element
    setStatus(newStatus);
    const data = {
      orderStatus: newStatus, // Ensure the key matches the expected API key
    };

    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        toast.success("Order Status Updated Successfully");
        console.log("Updated Order:", updatedOrder); // Log updated order for debugging
        // Optionally update local state if necessary
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const selectBorderStyle = {
    borderColor: "green",
  };

  return (
    <>
      {loading ? (
        <p>Updating...</p>
      ) : (
        <select
          id="status"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          style={selectBorderStyle}
          value={status}
          onChange={handleChange}
        >
          {Object.values(OrderStatus).map((statusValue) => (
            <option
              key={statusValue}
              value={statusValue}
            >
              {statusValue}
            </option>
          ))}
        </select>
      )}
    </>
  );
}
