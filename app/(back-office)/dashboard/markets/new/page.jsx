// Assuming you have a TextInput component
"use client";
import React  from 'react';
import FormHeader from '@/components/backoffice/FormHeader';
import MarketFrom from '@/components/backoffice/Forms/MarketsForm';


export default function Newmarket() {

  return (
    <div>
        <FormHeader title="New Market"/>
        <MarketFrom /> 
    </div>
  );
}
