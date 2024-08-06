import PageHeader from '@/components/backoffice/PageHeader';
import DataTable from '@/components/data-table-components/DataTable';
import { getData } from '@/lib/getData';
import React from 'react';
import OrderDetails from '@/components/backoffice/OrderDetails';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export default async function page() {
  const session = await getServerSession(authOptions);
  if(!session){
    return null;
  }
  const role = session?.user?.role
  return (
    <div>
        <OrderDetails />
    </div>
  )
}
