import NewCategoryForm from '@/components/backoffice/NewCategoryForm';
import React from 'react';
import FormHeader from '@/components/backoffice/FormHeader';
import { getData } from '@/lib/getData';
export  default async function NewCategory() {
  // Markets 
  const marketData = await  getData("markets");
  const market = marketData.map((market) => {
    return {
        id: market.id,
        title: market.title
    }
})

  return (
    <div>
    <FormHeader title="New Product Category"/>
  <NewCategoryForm markets={market} />
  </div>)
  
}
