"use client"

import { clearCart } from '@/redux/slices/cartSlice';
import { updateCheckoutFormData } from '@/redux/slices/checkoutSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';

export default function PaymentMethod() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch();
  const checkoutFormData = useSelector((store) => store.checkout.checkoutFormData);
  const cartItems = useSelector((store) => store.cart);
  const subTotal = cartItems
    .reduce((acc, currentItem) => acc + (currentItem.discountedPrice * currentItem.qty), 0)
    .toFixed(2);

  useEffect(() => {
    // Update checkoutFormData with the payment method on component mount
    dispatch(updateCheckoutFormData({ paymentMethod: 'Cash on Delivery' }));
  }, [dispatch]);

  async function submitData() {
    const data = {
      orderItems: cartItems,
      checkoutFormData: { ...checkoutFormData, paymentMethod: 'Cash on Delivery' },
    };
    console.log(data)
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        setLoading(false);
        toast.success("Order Created Successfully");
        dispatch(clearCart());
        router.push("order-confirmation")
      } else {
        setLoading(false);
        toast.error("Something went wrong, Please try again");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    console.log(data);
    // Further processing or API call can be made here
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md dark:bg-slate-800">
      <h2 className="text-2xl font-semibold mb-4">Select Payment Option</h2>
      <div className="border border-green-600 bg-slate-50 dark:bg-slate-700 rounded-md p-4 shadow-md mb-6">
        <div className="flex items-center">
          <input
            type="radio"
            id="cod"
            name="paymentMethod"
            value="Cash on Delivery"
            checked
            readOnly
            className="mr-4 text-green-500 border-green-400"
          />
          <label htmlFor="Cash on Delivery" className="text-lg font-medium">
            Cash on Delivery
          </label>
        </div>
        <p className="text-gray-600 mt-2">
          Pay with cash upon delivery of your order.
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Total: ₹{subTotal}</div>
        {
          loading?(
            <button disabled className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"> Processig Please wait...</button>
          ):
          (<button onClick={submitData} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Place Order
        </button>)
        }
      </div>
    </div>
  );
}
