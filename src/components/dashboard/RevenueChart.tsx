import React from 'react';
import { ChartData } from '../../types';
import Card from '../ui/Card';

interface RevenueChartProps {
  data: ChartData[];
  title: string;
  value: string;
  prefix?: string;
  change: number;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ 
  data, 
  title,
  value,
  prefix = '',
  change
}) => {
  const maxValue = Math.max(...data.map(item => item.value)) * 1.2;

  return (
    <Card 
      title={title}
      action={<span className="text-sm">Last 6 months</span>}
      className="mt-4"
    >
      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-3xl font-semibold">{prefix}{value}</span>
          <div className={`ml-4 flex items-center ${
            change > 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            <span className="text-sm font-medium">
              {change > 0 ? '+' : ''}{change}%
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-end h-36 mt-6 space-x-2">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="flex-1 flex flex-col items-center"
          >
            <div 
              className={`w-full rounded-t-sm ${
                item.isHighlighted ? 'bg-green-500' : 'bg-gray-200'
              }`}
              style={{ 
                height: `${(item.value / maxValue) * 100}%`,
                minHeight: '20px',
                transition: 'height 0.3s ease'
              }}
            ></div>
            <span className="text-xs text-gray-500 mt-2">{item.month}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RevenueChart;