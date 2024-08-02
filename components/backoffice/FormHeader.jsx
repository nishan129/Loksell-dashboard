"use client"
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function FormHeader({title}) {
  const router = useRouter()
  return (
    <div className="flex items-center justify-between py-4 px-12 text-slate-800 dark:text-slate-50 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
            <h2 className='text-xl  font-semibold'>{title}</h2>
            <button onClick={() => router.back()} className=''>
                <X /> 
            </button>
        </div>
  );
}
