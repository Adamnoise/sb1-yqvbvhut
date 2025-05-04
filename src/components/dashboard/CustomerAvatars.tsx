import React from 'react';
import { User } from '../../types';
import Card from '../ui/Card';

interface CustomerAvatarsProps {
  customers: User[];
}

const CustomerAvatars: React.FC<CustomerAvatarsProps> = ({ customers }) => {
  return (
    <Card 
      title="Most active customers" 
      action={<a href="#" className="text-blue-600 hover:text-blue-800">See all</a>}
      className="mt-4"
    >
      <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {customers.map((customer) => (
          <div 
            key={customer.id} 
            className="flex flex-col items-center space-y-1 flex-shrink-0 transition-transform hover:scale-105"
          >
            <div className="relative">
              <img 
                src={customer.avatar} 
                alt={customer.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex-shrink-0">
          <span>+{customers.length * 3}</span>
        </div>
      </div>
    </Card>
  );
};

export default CustomerAvatars;