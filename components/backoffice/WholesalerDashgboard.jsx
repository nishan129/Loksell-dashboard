import { authOptions } from '@/lib/authOptions'
import { getData } from '@/lib/getData';
import { getServerSession } from 'next-auth'
import React from 'react'
import OverviewCards from './Wholesalers/OverviewCards';

export default async function WholesalerDashgboard() {
  // Sales
  // Product
  const session = await getServerSession(authOptions)
  const user    = session?.user;
  // console.log(session?user);
  const {name, email, id, role, emailVerified} = user;
  const sales = await getData("sale")
  const saleById = sales.filter((sale) => sale.vendorId === id);
  const products = await getData("products");
  const productsById = products.filter((product) => product.WholesalerProfileId === id);
  return (
    <div>
      {/* <!-- Card Section --> */}
      <div className='max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
        <OverviewCards sales={saleById} products={productsById}/>
      </div>
    </div>
  )
}
