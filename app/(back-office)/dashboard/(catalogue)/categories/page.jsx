"use client"
import React from 'react';
import PageHeader from '@/components/backoffice/PageHeader';
import DataTable from '@/components/data-table-components/DataTable';
import { columns } from './columns';
import { getData } from '@/lib/getData';

export default async function Page() {
  const categories = await getData("categories");
  return (
    <div>
      {/* Header */}
      <PageHeader heading="Categories" LinkTitle="Add Category" href="/dashboard/categories/new" />

      {/* Table Actions
      <TableActions /> */}

      {/* Categories Heading */}
      <div className="">
        <DataTable data={categories} columns={columns} />
      </div>
    </div>
  );
}
