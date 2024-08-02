
import React from 'react';
import { columns } from './columns';

import DataTable from '@/components/data-table-components/DataTable';
import { getData } from '@/lib/getData';
import PageHeader from '@/components/backoffice/PageHeader';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export default async function Page() {
  const session = await getServerSession(authOptions);
  const id  = session?.user?.id;
  const role = session?.user?.role
  const allSales = await getData("sale");
  
  // Fetch all the Sales
  // Filter by vendorId => to get sales for this vendor
  // Featch Order by Id
  // Customer Name, email, Phone, Order Number
  const wholesalerSales = allSales.filter((sale) => sale.vendorId === id)
  
  return (
    <div>
      {/* Header */}
      {/* <PageHeader heading="Orders" LinkTitle="Add Products" href="/dashboard/products/new" /> */}

     <div>
     {
      role === "ADMIN"?(<DataTable data={allSales} columns={columns} />):
      (<DataTable data={wholesalerSales} columns={columns} />)
     }
     </div>
    </div>
  );
}
