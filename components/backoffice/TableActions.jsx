import Heading from '@/components/backoffice/Heading';
import { Download, Plus, Search, Trash2 } from 'lucide-react';
import React from 'react';


export default function TableActions() {
  return (
    <div>
        <div className="flex justify-between py-2 px-6 bg-white dark:bg-slate-700 rounded-lg items-center gap-8">
        
        {/* Export Button */}
        <button className="inline-flex items-center justify-center py-1.5 px-2 space-x-3 text-sm font-medium text-gray-900 dark:bg-slate-800 bg-slate-100 border border-slate-900 rounded-lg group  focus:ring-1 dark:text-white focus:outline-none focus:ring-green-600 dark:focus:ring-green-600">
          <Download />
          <span>Export</span>
        </button>

        {/* Search */}
        <div className="flex-grow ">
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input 
              type="text" 
              id="table-search" 
              className="block py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-600 focus:border-green-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-600 dark:focus:border-green-600 w-full" 
              placeholder="Search for items" 
            />
          </div>
        </div>

        {/* Search Button */}
        {/* <button className="py-3 px-4 bg-green-600 text-white rounded-lg">
          Search
        </button> */}

        {/* Bulk Delete Button */}
        <button className="flex items-center space-x-2 bg-red-600 text-white rounded-lg px-2 py-1.5">
          <Trash2 />
          <span>Bulk Delete</span>
        </button>
      </div>
    </div>
  )
}
