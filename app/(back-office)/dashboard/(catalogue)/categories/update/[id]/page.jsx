import React from 'react';
import NewCategoryForm from '@/components/backoffice/NewCategoryForm';
import FormHeader from '@/components/backoffice/FormHeader';
import { getData } from '@/lib/getData';

export default async function UpdateCatrgory({params:{id}}) {
  const category = await getData(`categories/${id}`)
  const marketData = await  getData("markets");
  const market = marketData.map((market) => {
    return {
        id: market.id,
        title: market.title
    }
})
  return (
    <div>
       <FormHeader title="Update Category"/>
       <NewCategoryForm updateData={category} markets={market} />
    </div>
  )
}
