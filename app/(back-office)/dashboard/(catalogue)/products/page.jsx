"use client"

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
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

export default function Page() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    const loadProducts = async () => {
      try {
        if (session) {
          const allProducts = await fetchData('products');
          setProducts(allProducts);
        }
      } catch (error) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [session, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You need to be logged in to view this page.</div>;
  }

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const role = session.user?.role;
  const id = session.user?.id;

  const wholesalerProducts = products.filter((product) => product.WholesalerProfileId === id);

  return (
    <div>
      {/* Header */}
      <PageHeader heading="Products" LinkTitle="Add Products" href="/dashboard/products/new" />

      {/* Data Table */}
      <div>
        {role === "ADMIN" ? (
          <DataTable data={products} columns={columns} />
        ) : (
          <DataTable data={wholesalerProducts} columns={columns} />
        )}
      </div>
    </div>
  );
}
