import PageHeader from '@/components/backoffice/PageHeader';
import DataTable from '@/components/data-table-components/DataTable';
import { getData } from '@/lib/getData';

import React from 'react';
import { columns } from './columns';

export default async function page() {
  const orders = await getData("orders")
  return (
    <div>
      <h2 className='dark:text-slate-50 text-slate-800'>Orders</h2>
         <div className="">
        <DataTable data={orders} columns={columns} />
      </div>
    </div>
  )
}