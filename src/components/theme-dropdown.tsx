import React from 'react';
import { Icon } from '@iconify/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import { useTheme } from '../context/theme-context';

interface ThemeDropdownProps {
  buttonVariant?: 'light' | 'flat' | 'solid' | 'bordered';
  buttonColor?: 'default' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * ThemeDropdown Component
 * 
 * A dropdown menu for selecting theme options
 */
export const ThemeDropdown: React.FC<ThemeDropdownProps> = ({
  buttonVariant = 'light',
  buttonColor = 'default',
  size = 'md',
  className = ''
}) => {
  const { theme, setTheme } = useTheme();
  
  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return 'lucide:sun';
      case 'dark': return 'lucide:moon';
      case 'system': return 'lucide:laptop';
      default: return 'lucide:sun';
    }
  };
  
  const getThemeLabel = () => {
    switch (theme) {
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      case 'system': return 'System';
      default: return 'Light';
    }
  };
  
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          variant={buttonVariant}
          color={buttonColor}
          size={size}
          startContent={<Icon icon={getThemeIcon()} className="w-4 h-4" />}
          endContent={<Icon icon="lucide:chevron-down" className="w-4 h-4" />}
          className={className}
          aria-label="Select theme"
        >
          {getThemeLabel()}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Theme options"
        selectionMode="single"
        selectedKeys={new Set([theme])}
        onSelectionChange={(keys) => {
          const selected = Array.from(keys)[0];
          if (selected) {
            setTheme(selected as 'light' | 'dark' | 'system');
          }
        }}
      >
        <DropdownItem 
          key="light" 
          startContent={<Icon icon="lucide:sun" className="w-4 h-4" />}
        >
          Light
        </DropdownItem>
        <DropdownItem 
          key="dark" 
          startContent={<Icon icon="lucide:moon" className="w-4 h-4" />}
        >
          Dark
        </DropdownItem>
        <DropdownItem 
          key="system" 
          startContent={<Icon icon="lucide:laptop" className="w-4 h-4" />}
        >
          System
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};