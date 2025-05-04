import React from 'react';
import { Tabs, Tab, Button } from '@heroui/react';
import { Icon } from '@iconify/react';

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
}

export const DashboardTabs = ({ activeTab, onTabChange }: DashboardTabsProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key: string) => onTabChange(key)}
        color="primary"
        variant="underlined"
        size="lg"
        classNames={{
          tabList: 'gap-6',
          cursor: 'w-full',
          tab: 'px-0 h-12',
        }}
      >
        <Tab
          key="overview"
          title="Overview"
          startContent={<Icon icon="lucide:home" className="w-4 h-4" />}
        />
        <Tab
          key="analytics"
          title="Analytics"
          startContent={<Icon icon="lucide:bar-chart-2" className="w-4 h-4" />}
        />
        <Tab
          key="reports"
          title="Reports"
          startContent={<Icon icon="lucide:file-text" className="w-4 h-4" />}
        />
        <Tab
          key="notifications"
          title="Notifications"
          startContent={<Icon icon="lucide:bell" className="w-4 h-4" />}
        />
      </Tabs>
      
      <div className="flex items-center gap-2">
        <ActionButton icon="lucide:download" label="Export" />
        <ActionButton icon="lucide:file-text" label="Reports" />
        <ActionButton icon="lucide:settings" label="Settings" />
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label }: { icon: string; label: string }) => {
  return (
    <Button
      variant="flat"
      color="default"
      className="bg-content1 border border-default-200"
      startContent={<Icon icon={icon} className="w-4 h-4" />}
    >
      <span className="hidden sm:inline">{label}</span>
    </Button>
  );
};