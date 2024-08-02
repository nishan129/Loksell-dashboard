import { getData } from '@/lib/getData';
import React from 'react';
import {convertIsoDateToNormal} from "@/lib/convertisoDatetoNormal";
import Link from 'next/link';

export default async function OrderDetails() {
    const orders = await getData("orders");
    const sales = await getData("sale");

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8 dark:text-slate-50 text-slate-800'>
            {orders.map(order => {
                const orderSale = sales.find(sale => sale.orderId === order.id);
                return (
                    <Link href={`/dashboard/invoice/${order.orderNumber}`} >
                    <div key={order.id} className='border border-green-500  rounded-lg dark:text-white shadow-lg hover:shadow-xl p-6 flex flex-col'>
                        <p><strong>Order No: </strong> {order.orderNumber}</p>
                        <p><strong>Store Name:</strong> {order.storename}</p>
                        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                        <p><strong>Order Status:</strong> {order.orderStatus}</p>
                        {orderSale && (
                            <div>
                                <p><strong>Total Sale:</strong> {orderSale.total}</p>
                                <p><strong>Sale Date:</strong> {convertIsoDateToNormal(orderSale.createdAt)}</p>
                            </div>
                        )}

                            <p><strong>Order Items:</strong> {order.orderItems.length}</p>
                    </div>
                    </Link>
                );
            })}
        </div>
    );
}
