import React from 'react';
import { LayoutDashboard, BarChart2, Users, ShoppingCart, Menu } from 'lucide-react';

interface MobileNavProps {
  onMenuClick: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ onMenuClick }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="flex justify-around items-center p-3">
        <button className="flex flex-col items-center text-blue-600">
          <LayoutDashboard size={20} />
          <span className="text-xs mt-1">Dashboard</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <BarChart2 size={20} />
          <span className="text-xs mt-1">Analytics</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Users size={20} />
          <span className="text-xs mt-1">Customers</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <ShoppingCart size={20} />
          <span className="text-xs mt-1">Products</span>
        </button>
        <button className="flex flex-col items-center text-gray-500" onClick={onMenuClick}>
          <Menu size={20} />
          <span className="text-xs mt-1">Menu</span>
        </button>
      </div>
    </div>
  );
};

export default MobileNav;