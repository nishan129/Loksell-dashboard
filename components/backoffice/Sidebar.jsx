"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from "../../public/logo.png";
import { FaUser } from 'react-icons/fa';
import { Boxes, Building2, ChevronDown, ChevronRight, IndianRupee, LayoutGrid, LayoutList, LogOut, MonitorPlay, ScanSearch, SendToBack, Settings, ShoppingBag, Slack, Store, Truck, User2, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSession } from 'next-auth/react';
import handleLogout from '@/lib/handleLogout';

export default function Sidebar({showSidebar, setShowSidebar}) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const {data:session, status } = useSession()
  if (status === "loading"){
    return <p>Loading...</p>
  }

  const role = session?.user.role;

  async function handleLogout() {
    await signOut({ redirect: false });
    router.push('/');
  }
  let sidebarLinks = [
    { title: "Customers", icon: User2, href: "/dashboard/customers" },
    { title: "Orders", icon: Truck, href: "/dashboard/orders" },
    { title: "Orders Details", icon: Truck, href: "/dashboard/ordersDetailes" },
    { title: "Markets", icon: Building2, href: "/dashboard/markets" },
    { title: "Wholeseller", icon: ShoppingBag, href: "/dashboard/wholesaller" },
    { title: "Staff", icon: Users, href: "/dashboard/staff" },
    {title: "Wallet", icon: IndianRupee, href: "/dashboard/wallet"},
    { title: "Settings", icon: Settings, href: "/dashboard/settings" },
    { title: "Online Store", icon: Store, href: "/" },
  ];

  let catalogueLinks = [
    { title: "Products", icon: Boxes, href: "/dashboard/products" },
    { title: "Categories", icon: LayoutList, href: "/dashboard/categories" },
    { title: "Coupons", icon: ScanSearch, href: "/dashboard/coupons" },
    { title: "Store Banners", icon: MonitorPlay, href: "/dashboard/banners" },
  ];
  if (role === "WHOLESALER"){
    sidebarLinks = [
      // { title: "Orders", icon: Truck, href: "/dashboard/orders" },
      { title: "Sales", icon: Truck, href: "/dashboard/sales" },
      { title: "Markets", icon: Building2, href: "/dashboard/markets" },
      {title: "Wallet", icon: IndianRupee, href: "/dashboard/wallet"},
      { title: "Settings", icon: Settings, href: "/dashboard/settings" },
      { title: "Online Store", icon: Store, href: "/" },];
    catalogueLinks = [
        { title: "Products", icon: Boxes, href: "/dashboard/products" },
        // { title: "Coupons", icon: ScanSearch, href: "/dashboard/coupons" },
      ];
  } if(role === "KIRANA"){
    sidebarLinks = [
      { title: "Orders", icon: Truck, href: "/dashboard/orders" },
      { title: "Profile", icon: FaUser, href: "/dashboard/profile" },
      { title: "Online Store", icon: Store, href: "/" },]
      catalogueLinks = []
  }
  return (
    <div className={showSidebar?" dark:bg-slate-800 mt-8 sm:mt-0 bg-slate-50 space-y-0 w-60 h-screen dark:text-slate-50 text-slate-800 fixed left-0 top-0 shadow-md overflow-y-scroll": "hidden sm:mt-0  sm:block dark:bg-slate-800 bg-slate-50 space-y-0 w-60 h-screen dark:text-slate-50 text-slate-800 fixed left-top-0 shadow-md overflow-y-scroll"}>
      <Link onClick={() => setShowSidebar(false)} href="/dashboard" className="px-4 py-2">
        <Image src={logo} alt="E-APP" className='w-1/2'/>
      </Link>
      <div className='space-y-3 flex flex-col'>
        <Link onClick={() => setShowSidebar(false)} href="/dashboard" className={`flex items-center space-x-2 px-4 py-2 border-l-4 ${pathname === '/dashboard' ? 'border-green-600 text-green-600' : 'border-transparent'}`}>
          <LayoutGrid />
          <span>Dashboard</span>
        </Link>
        {catalogueLinks.length > 0 && <Collapsible className='px-4 py-2'>
          <CollapsibleTrigger className='' onClick={() => setOpenMenu(!openMenu)}>
            <button className='flex items-center justify-between w-full space-x-2 border-l-4 border-transparent'>
              <div className="flex items-center space-x-2">
                <Slack />
                <span>Catalogue</span>
              </div>
              {openMenu ? <ChevronDown /> : <ChevronRight />}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className='rounded-lg px-3 pl-6 dark:bg-slate-800 bg-slate-50 shadow-lg'>
            {catalogueLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link onClick={() => setShowSidebar(false)} key={i} href={item.href} className={`flex items-center space-x-2 py-1 text-sm ${pathname === item.href ? 'border-green-600 text-green-600' : 'border-transparent'}`}>
                  <Icon className='w-4 h-4' />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
          }
        
        {sidebarLinks.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link onClick={() => setShowSidebar(false)} key={i} href={item.href} className={`flex items-center space-x-2 px-4 py-2 border-l-4 ${pathname === item.href ? 'border-green-600 text-green-600' : 'border-transparent'}`}>
              <Icon />
              <span>{item.title}</span>
            </Link>
          );
        })}
        <div className='px-6 py-8 text-slate-50 '>
          <button onClick={handleLogout} className='bg-green-600 rounded-md flex items-center space-x-3 px-6 py-3'>
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
