import PageHeader from '@/components/backoffice/PageHeader';

import DataTable from '@/components/data-table-components/DataTable';
import { getData } from '@/lib/getData';

import React from 'react';
import { columns } from './columns';

export default async function page() {
  const banners = await getData("banners");
  return (
    <div>
        <PageHeader heading="Banners"
        href="/dashboard/banners/new"
        LinkTitle="Add Banner"/>
        <div className="App">
        <DataTable data={banners} columns={columns} />
      </div>
    </div>
  )
}