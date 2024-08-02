
import React from 'react';
import { columns } from './columns';

import DataTable from '@/components/data-table-components/DataTable';
import { getData } from '@/lib/getData';


import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export default async function Customers() {

  const customers = await getData("customers")
  
  return (
     <div>
     <DataTable data={customers} columns={columns} />
     </div>
 
  );
}
