import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="mr-4 md:hidden text-gray-500 hover:text-gray-700"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 py-2 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <button className="relative p-2">
          <Bell size={20} className="text-gray-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;