"use client"

import React, { useEffect, useState } from 'react';
import NewCategoryForm from '@/components/backoffice/NewCategoryForm';
import FormHeader from '@/components/backoffice/FormHeader';
import { getData } from '@/lib/getData';

const fetchMarkets = async () => {
  try {
    const response = await getData('markets');
    if (!response.ok) {
      throw new Error('Failed to fetch markets');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default function NewCategory() {
  const [markets, setMarkets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarkets = async () => {
      try {
        const marketData = await fetchMarkets();
        const formattedMarkets = marketData.map((market) => ({
          id: market.id,
          title: market.title,
        }));
        setMarkets(formattedMarkets);
      } catch (error) {
        setError(error.message);
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
