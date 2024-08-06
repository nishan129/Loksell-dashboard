import FormHeader from "@/components/backoffice/FormHeader";
import NewBannerForm from "@/components/backoffice/NewBannerForms";
import { getData } from '@/lib/getData';
import React from 'react';
export default async function NewBanner() {
  const marketData = await  getData("markets");
  const market = marketData.map((market) => {
    return {
        id: market.id,
        title: market.title
    }
})
    {/*
        -id => auto()
        -title
        -link
        -image
        -isActive
         */}
  return (
    <div>
        <FormHeader title="New Banner"/>
        <NewBannerForm markets={market} />
    </div>
  );
}
