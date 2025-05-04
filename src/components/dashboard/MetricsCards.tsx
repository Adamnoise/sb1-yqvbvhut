import React from 'react';
import { MetricCard } from '../../types';
import Card from '../ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricsCardsProps {
  metrics: MetricCard[];
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-2">{metric.label}</span>
            <div className="flex items-baseline">
              <span className="text-3xl font-semibold">
                {metric.prefix && metric.prefix}{metric.value}
              </span>
              <div className={`ml-4 flex items-center ${
                metric.change > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {metric.change > 0 ? (
                  <TrendingUp size={16} className="mr-1" />
                ) : (
                  <TrendingDown size={16} className="mr-1" />
                )}
                <span className="text-sm font-medium">
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MetricsCards;