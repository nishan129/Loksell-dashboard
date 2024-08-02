// Assuming you have a TextInput component
"use client";
import React  from 'react';
import FormHeader from '@/components/backoffice/FormHeader';
import MarketFrom from '@/components/backoffice/Forms/MarketsForm';
import { getData } from '@/lib/getData';


export default async function UpdateMarket({ params: { id } }) {
  const market = await getData(`markets/${id}`)
  return (
    <div>
        <FormHeader title="Update Market"/>
        <MarketFrom updateData={market}  /> 
    </div>
  );
}
