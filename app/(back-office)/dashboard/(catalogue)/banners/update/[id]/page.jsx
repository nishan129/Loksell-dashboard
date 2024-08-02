import React from 'react';
import FormHeader from "@/components/backoffice/FormHeader";
import NewBannerForm from '@/components/backoffice/NewBannerForms';
import { getData } from '@/lib/getData';

export default async function UpdateBanner({ params: { id } }) {
  const banner = await getData(`banners/${id}`);
  console.log(id);
  console.log(banner);

  return (
    <div>
      <FormHeader title="Update Banner" />
      {banner && <NewBannerForm updateData={banner} />}
    </div>
  );
}

