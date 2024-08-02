import { getData } from '@/lib/getData';
import { convertIsoDateToNormal } from "@/lib/convertisoDatetoNormal";
import React from 'react';

export default async function OrderInvoice({ orderNumber }) {
    const orders = await getData("orders");
    const sales = await getData("sale");
    const order = orders.find(order => order.orderNumber === orderNumber);
    const sale = sales.filter(sale => sale.orderId === order.id);

    if (!order || sale.length === 0) {
        return <div>Order or Sale not found</div>;
    }

    return (
        <section className="py-12 bg-white sm:py-16 lg:py-20">
            <div className="px-4 m-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-6xl mx-auto">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Order Details</h1>
                    </div>

                    <ul className="mt-8 space-y-5 lg:mt-12 sm:space-y-6 lg:space-y-10">
                        <li className="overflow-hidden bg-white border border-green-500 rounded-md">
                            <div className="lg:flex">
                                <div className="w-full border-b border-green-500 lg:max-w-xs lg:border-b-0 lg:border-r bg-gray-50">
                                    <div className="px-4 py-6 sm:p-6 lg:p-8">
                                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-2">
                                            <OrderDetail title="Order ID" detail={order.orderNumber} />
                                            <OrderDetail title="Date" detail={convertIsoDateToNormal(order.createdAt)} />
                                            <OrderDetail title="Total Amount" detail={`₹${sale.reduce((total, item) => total + item.total, 0)}`} />
                                            <OrderStatus status={order.orderStatus} />
                                            <OrderDetail title="Store Name" detail={order.storename}/>
                                            <OrderDetail title="Store Address" detail={order.streetAddress}/>
                                            <OrderDetail title="City" detail={order.city}/>
                                            <OrderDetail title="Postal Code" detail={order.zipCode}/>
                                            <OrderDetail title="State" detail={order.state}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 px-4 py-6 sm:p-6 lg:p-8">
                                    <ul className="space-y-4">
                                        {order.orderItems.map((item, index) => (
                                            <OrderItem key={index} item={item} />
                                        ))}
                                    </ul>

                                    <hr className="mt-8 border-green-500" />

                                    <div className="flex items-center mt-8 space-x-5">
                                        <ActionLink title="View Invoice" order={order} />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

function OrderDetail({ title, detail }) {
    return (
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-sm font-bold text-gray-900 mt-0.5">{detail}</p>
        </div>
    );
}

function OrderStatus({ status }) {
    const statusColor = status === "Delivered" ? "bg-green-500" : "bg-amber-400";
    return (
        <div>
            <p className="text-sm font-medium text-gray-500">Order Status</p>
            <div className="mt-0.5 flex items-center">
                <div className={`inline-flex items-center justify-center flex-shrink-0 w-3 h-3 rounded-full text-white ${statusColor} mr-1.5`}>
                    <svg className="w-2 h-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {status === "Delivered" ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        )}
                    </svg>
                </div>
                <span className="text-sm font-bold text-gray-900">{status}</span>
            </div>
        </div>
    );
}

function OrderItem({ item }) {
    return (
        <li className="relative flex pb-10 sm:pb-0">
            <div className="flex-shrink-0">
                <img className="object-cover rounded-lg w-28 h-28" src={item.imageUrl} alt={item.title} />
            </div>
            <div className="flex flex-col justify-between flex-1 ml-5">
                <div className="sm:grid sm:grid-cols-2 sm:gap-x-5">
                    <div>
                        <p className="text-base font-bold text-gray-900">{item.title}</p>
                        <p className="mt-1.5 text-sm font-medium text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <p className="text-base font-bold text-left text-gray-900 sm:text-right">₹{item.price}</p>
                    </div>
                </div>
            </div>
        </li>
    );
}

function ActionButton({ title }) {
    return (
        <button href="/dashboard/invoice2"
            type="button"
            className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-gray-900 transition-all duration-200 bg-white border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
        >
            {title}
        </button>
    );
}

function ActionLink({ title, order }) {
    return (
        <a
            href={`/dashboard/invoice2/${order.orderNumber}`}
            title={title}
            className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-gray-900 transition-all duration-200 bg-white border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
        >
            {title}
        </a>
    );
}
