import Heading from '@/components/backoffice/Heading';

import React from 'react';
import { columns } from './columns';

import DataTable from '@/components/data-table-components/DataTable';
import { getData } from '@/lib/getData';
import PageHeader from '@/components/backoffice/PageHeader';
import TableActions from '@/components/backoffice/TableActions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if(!session){
    return null;
  }
  const role = session?.user?.role
  const allProducts = await getData("products");
  const id  = session?.user?.id;

  const wholesalerProducts = allProducts.filter((product) => product.WholesalerProfileId === id)
  
  return (
    <div>
      {/* Header */}
      <PageHeader heading="Products" LinkTitle="Add Products" href="/dashboard/products/new" />

     <div>
     {
      role === "ADMIN"?(<DataTable data={allProducts} columns={columns} />):
      (<DataTable data={wholesalerProducts} columns={columns} />)
     }
     </div>
    </div>
  );
}
