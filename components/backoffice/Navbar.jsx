"use client"
import React from 'react';
import Link from 'next/link';
import { AlignJustify, Bell, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import ThemeSwitcherBtn from '../ThemeSwitcherBtn';
import Image from 'next/image';
import { X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from 'next-auth/react';
import UserAvtar from './UserAvtar';

export default function Navbar({setShowSidebar,showSidebar}) {
  const {data:session, status} = useSession()
  if(status === 'loading') {
    return <p>Loading...</p>
  } 
  return (
    <div className='flex fixed top-0 bg-green-300 items-center justify-between dark:bg-slate-800 text-slate-50 h-16  py-8  w-full px-8 z-50 sm:pr-[20rem]'>
      <Link href={"/"} className='sm:hidden dark:text-slate-50 text-slate-900'>
      E-App
      </Link>
      {/* Icon */}
      <button onClick={()=> setShowSidebar(!showSidebar)} className='text-green-600'>
        <AlignJustify />
      </button>
      {/* 3 Icons */}
      <div className="flex space-x-3 text-green-600">
        <ThemeSwitcherBtn />
        <DropdownMenu>
          <DropdownMenuTrigger>
          <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg ">
          <Bell className='text-green-600' />
          <span className="sr-only">Notifications</span>
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-0 end-5 dark:border-gray-900">20</div>
        </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="px-4 py-2 pr-8">
            <DropdownMenuLabel>Notification</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className='flex items-center' >
              <Image
                src="/profile.jpg"
                alt="User profile"
                width={200}
                height={200}
                className="w-8 h-8 rounded-full"/>
                <div className="flex flex-col space-y-1">
                  <p>Bottles Pepsi Soft Drink 250ml Bottle</p>
                  
                  <div className="flex items-center space-x-2">
                  <p className='px-3 py-0.5 bg-green-700 text-white rounded-full text-sm'>New Order</p>
                  <p>June 26 2024 - 12:40PM</p>
                </div>
                </div>
                <button>
                  <X/>
                </button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className='flex items-center' >
              <Image
                src="/profile.jpg"
                alt="User profile"
                width={200}
                height={200}
                className="w-8 h-8 rounded-full"/>
                <div className="flex flex-col space-y-1">
                  <p>Bottles Pepsi Soft Drink 250ml Bottle</p>
                  
                  <div className="flex items-center space-x-2">
                  <p className='px-3 py-0.5 bg-green-700 text-white rounded-full text-sm'>New Order</p>
                  <p>June 26 2024 - 12:40PM</p>
                </div>
                </div>
                <button>
                  <X/>
                </button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className='flex items-center' >
              <Image
                src="/profile.jpg"
                alt="User profile"
                width={200}
                height={200}
                className="w-8 h-8 rounded-full"/>
                <div className="flex flex-col space-y-1">
                  <p>Bottles Pepsi Soft Drink 250ml Bottle</p>
                  
                  <div className="flex items-center space-x-2">
                  <p className='px-3 py-0.5 bg-green-700 text-white rounded-full text-sm'>New Order</p>
                  <p>June 26 2024 - 12:40PM</p>
                </div>
                </div>
                <button>
                  <X/>
                </button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
       {/* {status === "authenticated" &<UserAvtar user={session?.user} />} */}
       <UserAvtar user={session?.user} />
      </div>
    </div>
  );
}
