import React from 'react';
import Heading from '@/components/backoffice/Heading';
import LargeCards from '@/components/backoffice/LargeCards';
import SmallCards from '@/components/backoffice/SmallCards';
import DashboardCharts from '@/components/backoffice/DashboardCharts';
import KiranaDashboard from '@/components/backoffice/KiranaDashboard';
import WholesalerDashgboard from '@/components/backoffice/WholesalerDashgboard';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { getData } from '@/lib/getData';

const Page = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  // Fetch data in parallel to improve performance
  const [sales, products, orders] = await Promise.all([
    getData('sale'),
    getData('products'),
    getData('orders'),
  ]);

  // Render the specific dashboard based on the user role
  if (role === 'KIRANA') {
    return <KiranaDashboard />;
  }
  
  if (role === 'WHOLESALER') {
    return <WholesalerDashgboard />;
  }

  // Default dashboard
  return (
    <div>
      <Heading title="Dashboard Overview" />
      <LargeCards sales={sales} />
      <SmallCards orders={orders} />
      <DashboardCharts sales={sales} orders={orders} />
      {/* Uncomment the following line if CustomDataTable is needed */}
      {/* <CustomDataTable /> */}
    </div>
  );
};

export default Page;
