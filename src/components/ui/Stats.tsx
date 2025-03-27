
import { ArrowDownRight, ArrowUpRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon?: LucideIcon;
  className?: string;
}

export const StatCard = ({ title, value, change, icon: IconComponent, className }: StatCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <div className={cn(
      "rounded-xl p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md",
      className
    )}>
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <p className="text-sm font-medium text-white/80">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          
          <div className="flex items-center">
            <span className={cn(
              "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
              isPositive 
                ? "bg-white/20 text-white" 
                : "bg-white/20 text-white"
            )}>
              {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              {Math.abs(change)}%
            </span>
            <span className="ml-2 text-xs font-medium text-white/70">
              {isPositive ? 'Increased' : 'Decreased'} vs last month
            </span>
          </div>
        </div>
        
        {IconComponent && (
          <div className="rounded-lg bg-white/20 p-3">
            <IconComponent className="h-6 w-6 text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export const StatGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
};
