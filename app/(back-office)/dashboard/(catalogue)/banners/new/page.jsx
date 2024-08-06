import FormHeader from "@/components/backoffice/FormHeader";
import NewBannerForm from "@/components/backoffice/NewBannerForms";
import { getData } from '@/lib/getData';
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
export default async function NewBanner() {
  const session = await getServerSession(authOptions);
  if(!session){
    return null;
  }
  const role = session?.user?.role
  const marketData = await  getData("markets");
  const id  = session?.user?.id;
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
