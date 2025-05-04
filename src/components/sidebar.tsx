import React from 'react';
import { Icon } from '@iconify/react';
import { Button } from './ui/button';

interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  hasDropdown?: boolean;
}

export const Sidebar = ({ collapsed = false }) => {
  return (
    <div className={`${collapsed ? 'w-[80px]' : 'w-[280px]'} border-r border-default-100 bg-content1 h-screen sticky top-0 flex flex-col transition-all duration-300`}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          {!collapsed && <span className="font-bold text-lg">CORE 2.0</span>}
        </div>

        <nav className="py-2">
          <div className="mb-8">
            <p className={`text-xs font-medium text-default-500 uppercase px-3 mb-4 tracking-wider ${collapsed ? 'text-center' : ''}`}>
              {collapsed ? 'MENU' : 'MAIN MENU'}
            </p>
            <div className="space-y-1">
              <NavItem icon="lucide:layout-dashboard" label="Dashboard" active collapsed={collapsed} />
              <NavItem icon="lucide:package" label="Products" collapsed={collapsed} />
              <NavItem icon="lucide:users" label="Customers" collapsed={collapsed} />
              <NavItem icon="lucide:shopping-bag" label="Shop" collapsed={collapsed} />
              <NavItem icon="lucide:file-text" label="Income" collapsed={collapsed} />
              <NavItem icon="lucide:calendar" label="Promote" collapsed={collapsed} />
            </div>
          </div>
          
          <div className="mb-8">
            <p className={`text-xs font-medium text-default-500 uppercase px-3 mb-4 tracking-wider ${collapsed ? 'text-center' : ''}`}>
              {collapsed ? 'SETS' : 'SETTINGS'}
            </p>
            <div className="space-y-1">
              <NavItem icon="lucide:settings" label="Settings" collapsed={collapsed} />
              <NavItem icon="lucide:help-circle" label="Help & Support" collapsed={collapsed} />
            </div>
          </div>
        </nav>
      </div>
      
      {!collapsed && (
        <div className="mt-auto px-6 py-6">
          <div className="rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 p-4 text-white">
            <h4 className="font-medium mb-2">Need help?</h4>
            <p className="text-xs text-white/80 mb-3">Check our documentation</p>
            <Button size="sm" color="default" className="w-full bg-white text-primary-500 font-medium">
              Documentation
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const NavItem = ({ icon, label, active = false, hasDropdown = false, collapsed = false }) => {
  return (
    <Button
      variant={active ? "flat" : "light"}
      color={active ? "primary" : "default"}
      className={`justify-${collapsed ? 'center' : 'start'} w-full rounded-xl h-11 ${collapsed ? 'px-0' : 'px-4'} ${active ? "font-medium" : "text-default-700"}`}
      startContent={!collapsed && <Icon icon={icon} className={`w-5 h-5 ${active ? "text-primary" : "text-default-500"}`} />}
      endContent={!collapsed && hasDropdown && <Icon icon="lucide:chevron-down" className="w-4 h-4 text-default-400" />}
    >
      {collapsed ? (
        <Icon icon={icon} className={`w-5 h-5 ${active ? "text-primary" : "text-default-500"}`} />
      ) : (
        label
      )}
    </Button>
  );
};