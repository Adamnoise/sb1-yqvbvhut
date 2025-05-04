import React from 'react';
import { OverviewItem } from '../../types';
import Card from '../ui/Card';
import { CircleIcon, Package2Icon, Users2Icon, CreditCardIcon } from 'lucide-react';

interface OverviewProps {
  items: OverviewItem[];
}

const Overview: React.FC<OverviewProps> = ({ items }) => {
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'CircleIcon':
        return <CircleIcon size={20} />;
      case 'Package2Icon':
        return <Package2Icon size={20} />;
      case 'Users2Icon':
        return <Users2Icon size={20} />;
      case 'CreditCardIcon':
        return <CreditCardIcon size={20} />;
      default:
        return <CircleIcon size={20} />;
    }
  };

  return (
    <Card title="Overview" className="mt-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-2`}>
              {getIcon(item.icon)}
            </div>
            <span className="text-xs text-gray-500">{item.label}</span>
            <span className="text-lg font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Overview;