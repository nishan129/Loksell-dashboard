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
  const markets = await getData("markets")
  const id  = session?.user?.id;
  return (
    <div>
        <PageHeader heading="Markets"
        href="/dashboard/markets/new"
        LinkTitle="Add Market"/>
        {/* 
        image
        discription
        url
         */}
         <div className="">
        <DataTable data={markets} columns={columns} />
      </div>
    </div>
  )
}