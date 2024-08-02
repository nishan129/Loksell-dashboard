import React from 'react';
import LargeCard from './LargeCard';


export default function LargeCards({sales}) {
    const today = new Date();

// Calculate the start of the current week (assuming Monday is the first day of the week)
const currentDayOfWeek = today.getDay();
const thisWeekStart = new Date(today);
thisWeekStart.setDate(today.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1));
thisWeekStart.setHours(0, 0, 0, 0);

// Calculate the start of the current month
const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

// Calculate the end of today (to include sales till the end of the current day)
const endOfToday = new Date(today);
endOfToday.setHours(23, 59, 59, 999);

// Total sales
const totalSales = sales.reduce((acc, item) => acc + item.total, 0).toFixed(2);

// Today's sales
const todaySales = sales
    .filter((sale) => {
        const saleDate = new Date(sale.createdAt);
        return saleDate.toDateString() === today.toDateString();
    })
    .reduce((acc, sale) => acc + sale.total, 0)
    .toFixed(2);

// This week's sales
const thisWeekSales = sales
    .filter((sale) => {
        const saleDate = new Date(sale.createdAt);
        return saleDate >= thisWeekStart && saleDate <= endOfToday;
    })
    .reduce((acc, sale) => acc + sale.total, 0)
    .toFixed(2);

// This month's sales
const thisMonthSales = sales
    .filter((sale) => {
        const saleDate = new Date(sale.createdAt);
        return saleDate >= thisMonthStart && saleDate <= endOfToday;
    })
    .reduce((acc, sale) => acc + sale.total, 0)
    .toFixed(2);

    const orderStats = [
        {
            period:"Today Sales",
            sales: todaySales,
            color: "bg-green-600" 
        },
        {
            period:"This Week",
            sales: thisWeekSales,
            color: "bg-blue-600" 
        },
        {
            period:"This Month",
            sales: thisMonthSales,
            color: "bg-orange-600" 
        },
        {
            period:"All-Time Sales",
            sales: totalSales,
            color: "bg-purple-600" 
        }
    ];
  return <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8'>
    {
        orderStats.map((item, i) =>{
            return(
                <LargeCard className="bg-green-600" data={item} key={i} />
            )
        })
    }
    </div>;
  
}
