import React from 'react';
import FormHeader from "@/components/backoffice/FormHeader";
import NewBannerForm from '@/components/backoffice/NewBannerForms';
import { getData } from '@/lib/getData';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export default async function UpdateBanner({ params: { id } }) {
  const session = await getServerSession(authOptions);
  if(!session){
    return null;
  }
  const role = session?.user?.role
  const banner = await getData(`banners/${id}`);
  const marketData = await  getData("markets");

  const market = marketData.map((market) => {
    return {
        id: market.id,
        title: market.title
    }
})
  // const id  = session?.user?.id;
  console.log(id);
  console.log(banner);

  return (
    <div>
      <FormHeader title="Update Banner" />
      {banner && <NewBannerForm updateData={banner} markets={market} />}
    </div>
  );
}

