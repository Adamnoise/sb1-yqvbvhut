import React from 'react';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { Icon } from '@iconify/react';

interface ActivityItem {
  id: number;
  icon: string;
  iconColor: 'success' | 'primary' | 'warning' | 'danger' | 'purple';
  title: string;
  description: string;
  time: string;
}

export const ActivityTimeline = () => {
  const activities: ActivityItem[] = [
    {
      id: 1,
      icon: "lucide:check",
      iconColor: "success",
      title: "Order #1234 was completed",
      description: "Customer: Sarah Johnson",
      time: "2 hours ago"
    },
    {
      id: 2,
      icon: "lucide:user",
      iconColor: "primary",
      title: "New customer registered",
      description: "User: michael@example.com",
      time: "3 hours ago"
    },
    {
      id: 3,
      icon: "lucide:shopping-cart",
      iconColor: "warning",
      title: "New order #4567 received",
      description: "$156.00 - 3 items",
      time: "5 hours ago"
    },
    {
      id: 4,
      icon: "lucide:alert-triangle",
      iconColor: "danger",
      title: "Inventory alert: Product #127",
      description: "Only 2 items left in stock",
      time: "8 hours ago"
    },
    {
      id: 5,
      icon: "lucide:user-x",
      iconColor: "purple",
      title: "Customer #245 requested a refund",
      description: "Order #1122 - $78.50",
      time: "Yesterday"
    }
  ];

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex justify-between items-center px-6">
        <div>
          <h3 className="text-xl font-semibold">Recent Activity</h3>
          <p className="text-sm text-default-500">Latest actions and updates</p>
        </div>
        <Button 
          variant="light" 
          color="primary" 
          size="sm"
          endContent={<Icon icon="lucide:chevron-right" className="w-4 h-4" />}
        >
          View all
        </Button>
      </CardHeader>
      
      <CardBody className="px-6 py-2">
        <div className="space-y-5">
          {activities.map((activity) => (
            <ActivityRow key={activity.id} activity={activity} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

const ActivityRow = ({ activity }: { activity: ActivityItem }) => {
  const getIconColorClass = () => {
    switch (activity.iconColor) {
      case "success": return "bg-success/10 text-success";
      case "primary": return "bg-primary/10 text-primary";
      case "warning": return "bg-warning/10 text-warning";
      case "danger": return "bg-danger/10 text-danger";
      case "purple": return "bg-purple-500/10 text-purple-500";
      default: return "bg-default/10 text-default";
    }
  };
  
  return (
    <div className="flex items-start gap-3">
      <div className={`p-2.5 rounded-full ${getIconColorClass()}`}>
        <Icon icon={activity.icon} className="w-4 h-4" />
      </div>
      
      <div className="flex-1">
        <p className="font-medium text-sm">{activity.title}</p>
        <p className="text-xs text-default-500 mt-0.5">{activity.description}</p>
      </div>
      
      <span className="text-xs text-default-400 whitespace-nowrap">{activity.time}</span>
    </div>
  );
};