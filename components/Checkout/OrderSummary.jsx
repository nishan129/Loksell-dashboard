"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';

export default function OrderSummary({ setCurrentStep }) {
  const cartItems = useSelector((store) => store.cart);
  const subTotal = cartItems
    .reduce((acc, currentItem) => acc + (currentItem.discountedPrice * currentItem.qty), 0)
    .toFixed(2);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      {cartItems.map((cartItem, i) => (
        <div key={i} className="border border-green-600 bg-slate-50 dark:bg-slate-800 rounded-md p-4 mb-4 shadow-lg relative">
          <div className="absolute top-0 right-1 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-bl">
            Qty:{cartItem.qty}
          </div>
          <div className="flex">
            <input
              type="checkbox"
              className="mr-4 text-green-500 border-green-400"
              checked
              readOnly
            />
            <Image
              src={cartItem.imageUrl}
              width={150}
              height={150}
              alt={cartItem.title}
              className="w-20 h-20 object-cover"
            />
            <div className="ml-4">
              <h2 className="text-lg font-semibold">{cartItem.title}</h2>
              {cartItem.discount && (
                <div className="text-green-600 text-xs">
                  {cartItem.discount}% Discount <span className="text-xs">Limited time deal</span>
                </div>
              )}
              <div className="text-lg font-bold">₹{cartItem.discountedPrice}</div>
              {cartItem.discount && (
                <div className="text-gray-500 line-through">₹{cartItem.product_price}</div>
              )}
              <div className="text-green-500">In stock</div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center mt-8">
        <div className="text-xl font-bold">Total: ₹{subTotal}</div>
        <button
          className="px-4 py-2 mr-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => setCurrentStep(3)}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
