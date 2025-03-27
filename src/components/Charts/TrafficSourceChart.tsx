
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { TrafficSource } from "@/lib/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface TrafficSourceChartProps {
  data: TrafficSource[];
}

export const TrafficSourceChart = ({ data }: TrafficSourceChartProps) => {
  const isMobile = useIsMobile();
  const chartHeight = isMobile ? 220 : 250;

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={isMobile ? 40 : 60}
            outerRadius={isMobile ? 60 : 80}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Percentage']}
            contentStyle={{ 
              background: 'rgba(255, 255, 255, 0.8)', 
              border: 'none', 
              borderRadius: '6px', 
              boxShadow: '0 2px 15px rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(8px)'
            }} 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
