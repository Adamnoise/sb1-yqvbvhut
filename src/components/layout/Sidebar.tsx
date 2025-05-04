import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart2, 
  Users, 
  ShoppingCart, 
  Settings, 
  MessageSquare, 
  HelpCircle, 
  Menu, 
  X 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
    { icon: <BarChart2 size={20} />, label: 'Analytics' },
    { icon: <Users size={20} />, label: 'Customers' },
    { icon: <ShoppingCart size={20} />, label: 'Products' },
    { icon: <MessageSquare size={20} />, label: 'Messages' },
    { icon: <Settings size={20} />, label: 'Settings' },
    { icon: <HelpCircle size={20} />, label: 'Help' },
  ];

  return (
    <div className={`${expanded ? 'w-64' : 'w-20'} h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 fixed z-10`}>
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <div className={`flex items-center ${expanded ? '' : 'justify-center w-full'}`}>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-gray-400"></div>
          </div>
          {expanded && <span className="ml-3 font-semibold">Dashboard</span>}
        </div>
        <button 
          onClick={toggleSidebar} 
          className={`text-gray-500 hover:text-gray-700 ${expanded ? '' : 'hidden'}`}
        >
          {expanded ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 py-4">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <a 
                href="#" 
                className={`flex items-center py-3 px-5 text-gray-600 hover:bg-gray-100 transition-colors ${
                  item.active ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' : ''
                } ${expanded ? '' : 'justify-center'}`}
              >
                <span className={`${item.active ? 'text-blue-600' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                {expanded && <span className="ml-3">{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className={`p-4 border-t border-gray-200 ${expanded ? 'flex items-center' : 'flex justify-center'}`}>
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        {expanded && (
          <div className="ml-3">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;