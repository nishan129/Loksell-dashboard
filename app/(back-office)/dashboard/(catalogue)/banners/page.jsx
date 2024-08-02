"use client"

import PageHeader from '@/components/backoffice/PageHeader';
import DataTable from '@/components/data-table-components/DataTable';
import { useEffect, useState } from 'react';
import { columns } from './columns';

const fetchData = async () => {
  const response = await fetch("/api/banners");
  if (!response.ok) {
    throw new Error('Failed to fetch banners');
  }
  return response.json();
};

export default function Page() {
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        setBanners(data);
      } catch (error) {
        setError(error.message);
      }
    };

    loadData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <PageHeader heading="Banners" href="/dashboard/banners/new" LinkTitle="Add Banner" />
      <div className="App">
        <DataTable data={banners} columns={columns} />
      </div>
    </div>
  );
}
