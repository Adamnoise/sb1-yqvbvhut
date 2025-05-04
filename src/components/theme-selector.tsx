import React from 'react';
import { Icon } from '@iconify/react';
import { RadioGroup, Radio } from '@heroui/react';
import { useTheme } from '../context/theme-context';

interface ThemeSelectorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

/**
 * ThemeSelector Component
 * 
 * A radio group for selecting theme options
 */
export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  orientation = 'vertical',
  className = ''
}) => {
  const { theme, setTheme } = useTheme();
  
  return (
    <RadioGroup
      label="Select Theme"
      orientation={orientation}
      value={theme}
      onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
      className={className}
    >
      <Radio 
        value="light"
        description="Use light theme"
        startContent={<Icon icon="lucide:sun" className="w-4 h-4 text-warning-500" />}
      >
        Light
      </Radio>
      <Radio 
        value="dark"
        description="Use dark theme"
        startContent={<Icon icon="lucide:moon" className="w-4 h-4 text-primary-500" />}
      >
        Dark
      </Radio>
      <Radio 
        value="system"
        description="Follow system preference"
        startContent={<Icon icon="lucide:laptop" className="w-4 h-4 text-default-500" />}
      >
        System
      </Radio>
    </RadioGroup>
  );
};