"use client"

import React, { useEffect, useState } from 'react';
import PageHeader from '@/components/backoffice/PageHeader';
import DataTable from '@/components/data-table-components/DataTable';
import { columns } from './columns';

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`/api/${endpoint}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default function Page() {
  const [markets, setMarkets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData('markets');
        setMarkets(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <PageHeader heading="Markets" href="/dashboard/markets/new" LinkTitle="Add Market" />
      <div className="">
        <DataTable data={markets} columns={columns} />
      </div>
    </div>
  );
}
