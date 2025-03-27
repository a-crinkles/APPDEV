
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ActivityData } from "@/lib/types";

interface ActivityChartProps {
  data: ActivityData[];
}

export const ActivityChart = ({ data }: ActivityChartProps) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }} 
            axisLine={{ stroke: '#E5E7EB' }} 
            tickLine={false} 
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            axisLine={{ stroke: '#E5E7EB' }} 
            tickLine={false} 
          />
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#E5E7EB" 
          />
          <Tooltip 
            contentStyle={{ 
              background: 'rgba(255, 255, 255, 0.8)', 
              border: 'none', 
              borderRadius: '6px', 
              boxShadow: '0 2px 15px rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(8px)'
            }} 
          />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSales)"
            name="Sales"
          />
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#82ca9d"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorOrders)"
            name="Orders"
          />
          <Area
            type="monotone"
            dataKey="visitors"
            stroke="#ffc658"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorVisitors)"
            name="Visitors"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
