"use client"

import React, { useEffect, useState } from 'react';
import PageHeader from '@/components/backoffice/PageHeader';
import DataTable from '@/components/data-table-components/DataTable';
import { columns } from './columns';
import { getData } from '@/lib/getData';

const fetchData = async (endpoint) => {
  try {
    const response = await getData(endpoint);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData('coupons');
        setCoupons(data);
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
      {/* Header */}
      <PageHeader heading="Coupons" LinkTitle="Add Coupon" href="/dashboard/coupons/new" />

      {/* Table Actions */}
      <div className="">
        <DataTable data={coupons} columns={columns} />
      </div>
    </div>
  );
}
