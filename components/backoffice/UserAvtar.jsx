import React from 'react';
import { LayoutDashboard, Settings, LogOut } from 'lucide-react';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { getInitials } from '@/lib/generateinitials';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function UserAvtar({user={}}) {
    const {name, image} = user;
    const initial = getInitials(name)
    const router = useRouter();
    async function handleLogout() {
        await signOut();
        router.push('/');
    }
  return (  
    <DropdownMenu>
    <DropdownMenuTrigger>
      <button>
        {image?<Image
          src={image}
          alt="User profile"
          width={200}
          height={200}
          className="w-8 h-8 rounded-full"/>:(
            <div className='w-10 h-10 p-2 bg-slate-100 flex items-center  border border-green-600 rounded-full'>
               {initial} 
            </div>
          )}
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="px-4 py-2 pr-8">
      <DropdownMenuLabel>{name}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href="/dashboard" className='flex items-center'>
          <LayoutDashboard className='mr-2 h-4 w-4' /><span>Dashboard</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/dashboard/profile" className='flex items-center' >
          <Settings className='mr-2 h-4 w-4' />
        <span>Edit Profile</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <button onClick={handleLogout} className='flex items-center' >
          <LogOut className='mr-2 h-4 w-4' />
        <span>Logout</span>
        </button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
