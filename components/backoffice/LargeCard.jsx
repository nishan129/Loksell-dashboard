import { BadgeIndianRupee, IndianRupee } from 'lucide-react';
import React from 'react';

export default function LargeCard({data}) {
  return (<div className={`rounded-lg text-white shadow-md p-6 flex items-center flex-col gap-2 ${data.color} `}>
    <BadgeIndianRupee /> 
    <h4>{data.period}</h4>
    <h2 className='lg:text-3xl text-2xl flex items-center'><IndianRupee />{data.sales}</h2>
  </div>
  );
}
