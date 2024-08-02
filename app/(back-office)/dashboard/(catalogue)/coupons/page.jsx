import Heading from '@/components/backoffice/Heading';
import { Download, Plus, Search, Trash2 } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/backoffice/PageHeader';
import { getData } from '@/lib/getData';
import DataTable from '@/components/data-table-components/DataTable';
import { columns } from './columns';

export default async function Coupons() {
  const copun = await getData("coupons"); 
  return (
    <div>
      {/* Header */}
      <PageHeader heading="Coupons" LinkTitle="Add Coupon" href="/dashboard/coupons/new" />

      {/* Table Actions */}
      <div className="">
        <DataTable data={copun} columns={columns} />
      </div>
    </div>
  );
}
