import React from 'react';
import { Card, CardContent, CardHeader, Button } from '@mui/material'; // Note: Material UI uses CardContent, not CardBody typically
import { Icon } from '@iconify/react';

interface MetricProps {
  icon: string;
  iconColor: string;
  title: string;
  value: string;
  change: number;
  isPositive: boolean;
}

export const OverviewMetrics = () => {
  const metrics = [
    {
      icon: "lucide:users",
      iconColor: "bg-primary-100 text-primary-500",
      title: "New customers",
      value: "1,205",
      change: 8.2,
      isPositive: true
    },
    {
      icon: "lucide:shopping-bag",
      iconColor: "bg-warning-100 text-warning-500",
      title: "Active products",
      value: "342",
      change: 5.1,
      isPositive: true
    },
    {
      icon: "lucide:credit-card",
      iconColor: "bg-success-100 text-success-500",
      title: "Successful payments",
      value: "2,400",
      change: -3.2,
      isPositive: false
    }
  ];

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex justify-between items-center px-6">
        <h3 className="text-lg font-semibold">Overview</h3>
        <Button 
          variant="light" 
          color="default" 
          size="sm"
          endContent={<Icon icon="lucide:chevron-down" className="w-4 h-4" />}
        >
          This Month
        </Button>
      </CardHeader>
      
      <CardBody className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <Metric key={index} {...metric} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

const Metric = ({ icon, iconColor, title, value, change, isPositive }: MetricProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className={`rounded-full p-3 ${iconColor}`}>
        <Icon icon={icon} className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm text-default-500">{title}</p>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">{value}</span>
          <span className={`text-xs flex items-center ${isPositive ? 'text-success' : 'text-danger'}`}>
            <Icon icon={isPositive ? 'lucide:trending-up' : 'lucide:trending-down'} className="w-3 h-3 mr-0.5" />
            {Math.abs(change)}%
          </span>
        </div>
      </div>
    </div>
  );
};