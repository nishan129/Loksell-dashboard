import Image from "next/image";
import React, { forwardRef } from "react";
import logo from "../../public/logo.png";
import { getData } from "@/lib/getData";
import { convertIsoDateToNormal } from "@/lib/convertisoDatetoNormal";

const SalesInvoice = forwardRef(({ order }, ref) => {
    return (
        <div ref={ref} className="max-w-4xl mx-auto border dark:text-slate-50 text-slate-900 border-gray-500 p-8 rounded-sm">
            {/* Header */}
            <div className="flex justify-between border-b border-gray-500 pb-8">
                <div className="flex flex-col">
                    <h2>Bill From: LocSell</h2>
                    <p>Bhilai</p>
                    <p>490020</p>
                    <p>Chhattisgarh</p>
                    <p>7024409426</p>
                </div>
                <Image src={logo} alt="limifood logo" className="w-36 h-16" />
            </div>
            {/* Header End */}
            <div className="flex justify-between border-b border-gray-500 py-8">
                <div className="flex flex-col">
                    <h2>Bill To:</h2>
                    <p>{order.storename}</p>
                    <p>{order.streetAddress}</p>
                    <p>{order.city}</p>
                    <p>{order.zipCode}</p>
                    <p>{order.state}</p>
                    <p>{order.phoneNumber}</p>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <p>Invoice</p>
                        <p>{order.orderNumber}</p>
                    </div>
                    <div className="flex justify-between gap-2">
                        <p>Invoice Date: </p>
                        <p>{convertIsoDateToNormal(order.createdAt)}</p>
                    </div>
                </div>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Item</th>
                            <th scope="col" className="px-6 py-3">Item Description</th>
                            <th scope="col" className="px-6 py-3">Qty</th>
                            <th scope="col" className="px-6 py-3">Unit Cost</th>
                            <th scope="col" className="px-6 py-3">Line Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.orderItems.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.title}
                                </th>
                                <td className="px-6 py-4">{item.description}</td>
                                <td className="px-6 py-4">{item.quantity}</td>
                                <td className="px-6 py-4">₹{item.price}</td>
                                <td className="px-6 py-4">₹{item.quantity * item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between border-b border-gray-500 py-8">
                <div className="flex flex-col">
                    <h2>NOTES</h2>
                    <p>Free Shipping for 30 Days Money back guarantee</p>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between gap-2">
                        <p>SubTotal</p>
                        <p>₹{order.orderItems.reduce((total, item) => total + item.quantity * item.price, 0)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Tax</p>
                        <p>₹2</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Total</p>
                        <p>₹{order.orderItems.reduce((total, item) => total + item.quantity * item.price, 0) + 20}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center pt-8">
                <Image src={logo} alt="limifood logo" className="w-36 h-16" />
            </div>
        </div>
    );
});

SalesInvoice.displayName = 'SalesInvoice';
export default SalesInvoice;
