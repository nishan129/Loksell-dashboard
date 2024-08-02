"use client"

import React, { useEffect, useState } from 'react';
import NewCategoryForm from '@/components/backoffice/NewCategoryForm';
import FormHeader from '@/components/backoffice/FormHeader';
import { getData } from '@/lib/getData';

export default function NewCategory() {
  const [markets, setMarkets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarkets = async () => {
      try {
        const marketData = await getData('markets');
        // Handle the raw data response
        const formattedMarkets = marketData.map((market) => ({
          id: market.id,
          title: market.title,
        }));
        setMarkets(formattedMarkets);
      } catch (error) {
        setError('Failed to fetch markets');
      } finally {
        setLoading(false);
      }
    };

    loadMarkets();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <FormHeader title="New Product Category" />
      <NewCategoryForm markets={markets} />
    </div>
  );
}
