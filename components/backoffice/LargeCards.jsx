import React from 'react';
import LargeCard from './LargeCard';

export default function LargeCards({sales}) {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)));
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfToday = new Date(today.setHours(23, 59, 59, 999));

  const calculateSales = (startDate, endDate = new Date()) => {
    return sales
      .filter(({ createdAt }) => {
        const saleDate = new Date(createdAt);
        return saleDate >= startDate && saleDate <= endDate;
      })
      .reduce((acc, { total }) => acc + total, 0)
      .toFixed(2);
  };

  const totalSales = calculateSales(new Date(0));
  const todaySales = calculateSales(new Date().setHours(0, 0, 0, 0));
  const thisWeekSales = calculateSales(startOfWeek, endOfToday);
  const thisMonthSales = calculateSales(startOfMonth, endOfToday);

  const orderStats = [
    { period: 'Today Sales', sales: todaySales, color: 'bg-green-600' },
    { period: 'This Week', sales: thisWeekSales, color: 'bg-blue-600' },
    { period: 'This Month', sales: thisMonthSales, color: 'bg-orange-600' },
    { period: 'All-Time Sales', sales: totalSales, color: 'bg-purple-600' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
      {orderStats.map((item, i) => (
        <LargeCard className={item.color} data={item} key={i} />
      ))}
    </div>
  );
}
