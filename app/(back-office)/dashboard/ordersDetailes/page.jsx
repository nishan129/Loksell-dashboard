import PageHeader from '@/components/backoffice/PageHeader';
import DataTable from '@/components/data-table-components/DataTable';
import { getData } from '@/lib/getData';
import React from 'react';
import OrderDetails from '@/components/backoffice/OrderDetails';

export default function page() {
   
  return (
    <div>
        <OrderDetails />
    </div>
  )
}
