import React from 'react';

export default function OverviewCards({ sales, products }) {
    const productsCount = products.length.toString().padStart(2,"0");
    const salesCount = sales.length.toString().padStart(2,"0");
    const totalSales = sales.reduce((acc, item) => acc + item.total, 0).toFixed(2);
    const analytics = [
        {
            title: "Products",
            count: productsCount,
            unit: "",
            link: "/dashboard/products",
            icon: "📦",
        },
        {
            title: "Sales",
            count: salesCount,
            unit: "",
            link: "/dashboard/sales",
            icon: "💰",
        },
        {
            title: "Total Revenue",
            count: totalSales,
            unit: "₹",
            link: "/dashboard/sales",
            icon: "💵",
        },
    ];

    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
            {analytics.map((item, i) => (
                <div key={i} className='p-4 border border-green-600 rounded shadow hover:shadow-lg transition duration-300'>
                    <div className='flex items-center justify-between'>
                        <div className='text-3xl'>
                            {item.icon}
                        </div>
                        <div className='text-right'>
                            <h3 className='text-xl dark:text-slate-50 text-green-600 font-semibold'>{item.title}</h3>
                            <p className='text-2xl dark:text-slate-50 text-green-600 '>
                                {item.unit}{item.count}
                            </p>
                        </div>
                    </div>
                    <a href={item.link} className='text-green-600 hover:underline mt-2 block'>View details</a>
                </div>
            ))}
        </div>
    );
}
