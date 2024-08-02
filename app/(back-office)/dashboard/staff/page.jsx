import PageHeader from '@/components/backoffice/PageHeader';
import TableActions from '@/components/backoffice/TableActions';

import React from 'react';

export default function page() {
  return (
    <div>
        <PageHeader heading="Staff"
        href="/dashboard/staff/new"
        LinkTitle="Add Staff"/>
        {/* 
        image
        discription
        url
         */}
          <TableActions />
         <div className="py-8">
        <h2 className='dark:text-slate-50 text-slate-900'>Table</h2>
      </div>
    </div>
  )
}
