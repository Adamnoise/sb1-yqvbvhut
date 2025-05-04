import React from 'react';
import { Icon } from '@iconify/react';
import { ThemeSwitcher } from './theme-switcher';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarCollapsed }) => {
  return (
    <header className="border-b border-default-100 bg-content1 py-4 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Button 
          isIconOnly 
          variant="light" 
          aria-label="Toggle sidebar" 
          onPress={toggleSidebar}
        >
          <Icon icon={isSidebarCollapsed ? "lucide:panel-right-open" : "lucide:panel-right-close"} className="w-5 h-5" />
        </Button>
        
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-1 text-default-500 text-sm">
            <span>/</span>
            <span>Overview</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <SearchBar />
        <ThemeSwitcher />
        <NotificationsButton />
        <UserButton />
      </div>
    </header>
  );
};

const SearchBar: React.FC = () => {
  return (
    <div className="relative max-w-md hidden md:block">
      <Input
        classNames={{
          base: "max-w-xs",
          inputWrapper: "bg-content2 border-default-200"
        }}
        placeholder="Search anything..."
        radius="full"
        startContent={
          <Icon icon="lucide:search" className="text-default-400 w-4 h-4 flex-shrink-0" />
        }
      />
    </div>
  );
};

const NotificationsButton: React.FC = () => {
  return (
    <Tooltip content="Notifications">
      <Badge content="5" color="primary" placement="top-right" size="sm">
        <Button isIconOnly variant="light" radius="full">
          <Icon icon="lucide:bell" className="w-5 h-5 text-default-500" />
        </Button>
      </Badge>
    </Tooltip>
  );
};

const UserButton: React.FC = () => {
  return (
    <Tooltip content="User profile">
      <Avatar
        src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
        size="sm"
        isBordered
        color="primary"
      />
    </Tooltip>
  );
};