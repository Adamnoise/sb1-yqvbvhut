import React from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';

export const DashboardWelcome = () => {
  const [dateRange, setDateRange] = React.useState('Last 7 days');
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-1">Welcome back, Alex</h2>
        <p className="text-default-500">Here's what's happening with your store today.</p>
      </div>
      
      <Button
        variant="flat"
        color="default"
        className="bg-content1 border border-default-200"
        startContent={<Icon icon="lucide:calendar" className="w-4 h-4 text-default-500" />}
        endContent={<Icon icon="lucide:chevron-down" className="w-4 h-4 text-default-500" />}
      >
        {dateRange}
      </Button>
    </div>
  );
};