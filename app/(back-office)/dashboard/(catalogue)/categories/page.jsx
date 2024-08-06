import Heading from '@/components/backoffice/Heading';
import { Download, Plus, Search, Trash2 } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/backoffice/PageHeader';
import TableActions from '@/components/backoffice/TableActions';
import DataTable from '@/components/data-table-components/DataTable';
import { columns } from './columns';
import { getData } from '@/lib/getData';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if(!session){
    return null;
  }
  const role = session?.user?.role
  const categories = await getData("categories");
  const id  = session?.user?.id;
  return (
    <div>
      {/* Header */}
      <PageHeader heading="Categories" LinkTitle="Add Category" href="/dashboard/categories/new" />

      {/* Table Actions

      {/* Categories Heading */}
      <div className="">
        <DataTable data={categories} columns={columns} />
      </div>
    </div>
  );
}
