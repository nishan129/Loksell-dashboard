import FormHeader from "@/components/backoffice/FormHeader";
import NewBannerForm from "@/components/backoffice/NewBannerForms";

import React from 'react';
export default function NewBanner() {
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
        <NewBannerForm />
    </div>
  );
}
