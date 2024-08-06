import PageHeader from '@/components/backoffice/PageHeader';
import DataTable from '@/components/data-table-components/DataTable';
import { getData } from '@/lib/getData';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import React from 'react';
import { columns } from './columns';

export default async function page() {
  const session = await getServerSession(authOptions);
  if(!session){
    return null;
  }
  const role = session?.user?.role
  const orders = await getData("orders")
  const id  = session?.user?.id;
  return (
    <div>
      <h2 className='dark:text-slate-50 text-slate-800'>Orders</h2>
         <div className="">
        <DataTable data={orders} columns={columns} />
      </div>
    </div>
  )
}