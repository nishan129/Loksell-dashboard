import PageHeader from '@/components/backoffice/PageHeader';
import DataTable from '@/components/data-table-components/DataTable';
import { getData } from '@/lib/getData';

import React from 'react';
import { columns } from './columns';

export default async function page() {
  const wholesaler = await getData("wholesaler")
  return (
    <div>
        <PageHeader heading="Wholesaller"
        href="/dashboard/wholesaller/new"
        LinkTitle="Add Wholesaller"/>
        {/* 
        image
        discription
        url
         */}
          <div className="">
        <DataTable data={wholesaler} columns={columns} filterKeys={["name"]}/>
      </div>
    </div>
  )
}
