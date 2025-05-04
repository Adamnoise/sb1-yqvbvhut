import React, { useCallback } from 'react';
import { Icon } from '@iconify/react';
import { Button, ButtonProps } from '@heroui/react';
import { useTheme } from '../context/theme-context';

interface ThemeToggleButtonProps extends Omit<ButtonProps, 'onPress'> {
  showIcon?: boolean;
  showLabel?: boolean;
  iconOnly?: boolean;
}

/**
 * ThemeToggleButton Component
 * 
 * A button that toggles between light and dark themes
 */
export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  showIcon = true,
  showLabel = true,
  iconOnly = false,
  className = '',
  variant = 'light',
  color = 'default',
  size = 'md',
  radius = 'md',
  ...props
}) => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';
  
  const handleToggle = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);
  
  const icon = isDarkTheme ? 'lucide:sun' : 'lucide:moon';
  const label = isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  
  if (iconOnly || !showLabel) {
    return (
      <Button
        isIconOnly
        variant={variant}
        color={color}
        size={size}
        radius={radius}
        onPress={handleToggle}
        aria-label={label}
        className={className}
        {...props}
      >
        <Icon icon={icon} className="w-5 h-5" />
      </Button>
    );
  }
  
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      radius={radius}
      onPress={handleToggle}
      startContent={showIcon && <Icon icon={icon} className="w-5 h-5" />}
      className={className}
      {...props}
    >
      {label}
    </Button>
  );
};