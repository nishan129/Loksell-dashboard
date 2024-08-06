
import React from 'react';
import { columns } from './columns';

import DataTable from '@/components/data-table-components/DataTable';
import { getData } from '@/lib/getData';


import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export default async function Customers() {

  const session = await getServerSession(authOptions);
  if(!session){
    return null;
  }
  const role = session?.user?.role
  const customers = await getData("customers")
  const id  = session?.user?.id;
  
  return (
     <div>
     <DataTable data={customers} columns={columns} />
     </div>
 
  );
}
