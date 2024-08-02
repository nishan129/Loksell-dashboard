// Assuming you have a TextInput component
"use client";
import React, { useState } from 'react';
import FormHeader from '@/components/backoffice/FormHeader';
import NewWholesalerForm from '@/components/backoffice/NewWholesalerForm';

export default function NewWholesaler() {

    // const title = watch("title")
    // const expiryDate = watch("expiryDate")
    
    // console.log(title,expiryDate,coupon)
    // Wholesaler Name => Nishant Borkar => NB
    // EAPP-NB-30062024-3355
  
    {/*
        -id => auto()
        -title
        -code => auto()
        -Expire Date
         */}
  return (
    <div>
        <FormHeader title="New Wholesaler"/>
        <NewWholesalerForm />
    </div>
  );
}
