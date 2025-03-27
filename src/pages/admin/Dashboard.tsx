import { ShoppingCart, DollarSign, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityChart } from '@/components/Charts/ActivityChart';
import { TrafficSourceChart } from '@/components/Charts/TrafficSourceChart';
import { StatCard, StatGrid } from '@/components/ui/Stats';
import { activityData, dashboardStats, trafficSources } from '@/lib/data';
import MainLayout from '@/components/Layout/MainLayout';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard = () => {
  const isMobile = useIsMobile();
  
  // Format number with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <StatGrid>
          <StatCard
            title="Weekly Sales"
            value={`$${formatNumber(dashboardStats.totalSales)}`}
            change={dashboardStats.salesGrowth}
            icon={DollarSign}
            className="sales-card"
          />
          
          <StatCard
            title="Weekly Orders"
            value={formatNumber(dashboardStats.totalOrders)}
            change={dashboardStats.ordersGrowth}
            icon={ShoppingCart}
            className="orders-card"
          />
          
          <StatCard
            title="Visitors Online"
            value={formatNumber(dashboardStats.activeUsers)}
            change={dashboardStats.usersGrowth}
            icon={Users}
            className="visitors-card"
          />
        </StatGrid>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 shadow-soft overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle>Visit And Sales Statistics</CardTitle>
              <CardDescription>Showing data from the last 8 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={isMobile ? "h-[300px]" : "h-[350px]"}>
                <ActivityChart data={activityData} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Top channels by percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <TrafficSourceChart data={trafficSources} />
              
              <div className="mt-6 space-y-3">
                {trafficSources.map((source) => (
                  <div key={source.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full mr-3" style={{ backgroundColor: source.color }} />
                      <span className="text-sm">{source.name}</span>
                    </div>
                    <span className="text-sm font-medium">{source.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <Card className="shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Latest user registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="flex items-center">
                  <img
                    src="https://randomuser.me/api/portraits/women/2.jpg"
                    alt="Jane Smith"
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="ml-4">
                    <p className="text-sm font-medium">Jane Smith</p>
                    <p className="text-xs text-muted-foreground">Registered 2 days ago</p>
                  </div>
                  <div className="ml-auto bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    Seller
                  </div>
                </div>
                
                <div className="flex items-center">
                  <img
                    src="https://randomuser.me/api/portraits/men/3.jpg"
                    alt="Michael Johnson"
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="ml-4">
                    <p className="text-sm font-medium">Michael Johnson</p>
                    <p className="text-xs text-muted-foreground">Registered 3 days ago</p>
                  </div>
                  <div className="ml-auto bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full dark:bg-orange-900 dark:text-orange-300">
                    Pending
                  </div>
                </div>
                
                <div className="flex items-center">
                  <img
                    src="https://randomuser.me/api/portraits/women/4.jpg"
                    alt="Emily Wilson"
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="ml-4">
                    <p className="text-sm font-medium">Emily Wilson</p>
                    <p className="text-xs text-muted-foreground">Registered 1 week ago</p>
                  </div>
                  <div className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    Buyer
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
