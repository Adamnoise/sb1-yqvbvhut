import React, { memo } from 'react';
import { Icon } from '@iconify/react';
import { Card, CardBody } from '@heroui/react';

const StatCard = memo(({
  title,
  value,
  change,
  isPositive,
  subtitle,
  icon,
  color
}: StatCardProps) => {
  const getColorClass = () => {
    switch (color) {
      case "primary": return "bg-primary/10 text-primary";
      case "success": return "bg-success/10 text-success";
      case "warning": return "bg-warning/10 text-warning";
      case "danger": return "bg-danger/10 text-danger";
      default: return "bg-primary/10 text-primary";
    }
  };

  return (
    <Card className="border-none shadow-sm">
      <CardBody>
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm font-medium text-default-600">{title}</p>
          <div className={`rounded-full p-2.5 ${getColorClass()}`}>
            <Icon icon={icon} className="w-5 h-5" />
          </div>
        </div>
        
        <div className="text-2xl font-bold mb-2">{value}</div>
        
        <div className="flex items-center gap-1.5">
          <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? "text-success" : "text-danger"}`}>
            <Icon icon={isPositive ? "lucide:trending-up" : "lucide:trending-down"} className="w-3.5 h-3.5" />
            <span>{Math.abs(change)}%</span>
          </div>
          <div className="text-xs text-default-400">{subtitle}</div>
        </div>
      </CardBody>
    </Card>
  );
});

StatCard.displayName = 'StatCard';

const StatCards = () => {
  const metrics = React.useMemo(() => [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: 20.1,
      isPositive: true,
      subtitle: "from last month",
      icon: "lucide:dollar-sign",
      color: "primary"
    },
    {
      title: "New Customers",
      value: "1,293",
      change: -36.8,
      isPositive: false,
      subtitle: "from last month",
      icon: "lucide:users",
      color: "success"
    },
    {
      title: "Sales",
      value: "12,234",
      change: 10.3,
      isPositive: true,
      subtitle: "from last month",
      icon: "lucide:shopping-bag",
      color: "warning"
    },
    {
      title: "Active Users",
      value: "573",
      change: 8.4,
      isPositive: true,
      subtitle: "from last month",
      icon: "lucide:activity",
      color: "danger"
    }
  ], []);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <StatCard key={index} {...metric} />
      ))}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  isPositive: boolean;
  subtitle: string;
  icon: string;
  color: "primary" | "success" | "warning" | "danger";
}

export default memo(StatCards);