import React from 'react';
import SmallCard from './SmallCard';
import { ShoppingCart, CheckCheck, Truck , Loader2} from 'lucide-react';


export default function SmallCards({orders}) {
     const orderStatus ={
        pending:"PENDING",
        processing:"PROCESSING",
        shipping:"SHIPPED",
        delivering:"DELIVERED",
        cancelling:"CANCELED"
      }
    function getOrdersCountByStatus(status){
        const filteredOrders = orders.filter((order)=> order.orderStatus===status)
        const count = filteredOrders.length.toString().padStart(2,"0");
        return count
    }
    const OrdersCount = orders.length.toString().padStart(2,"0");
    const countPandingOrders = getOrdersCountByStatus(orderStatus.pending)
    const countprocessingOrders = getOrdersCountByStatus(orderStatus.processing)
    const countdiliverdOrders = getOrdersCountByStatus(orderStatus.delivering)
    const data = [
        {
            title:"Total Orders",
            number: OrdersCount,
            iconBg: "bg-green-600",
            icon: ShoppingCart  
        },
        {
            title:"Orders Pending",
            number: countPandingOrders,
            iconBg: "bg-blue-600" ,
            icon: Loader2 
        },
        {
            title:"Orders Processing",
            number: countprocessingOrders,
            iconBg: "bg-orange-600" ,
            icon: Truck 
        },
        {
            title:"Orders Delivered",
            number: countdiliverdOrders,
            iconBg: "bg-purple-600" ,
            icon: CheckCheck 
        }
    ];
  return (
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8'>
    {
        data.map((data, i) =>{
            return <SmallCard data={data}  />;
        })}
    </div>
    );
  
}