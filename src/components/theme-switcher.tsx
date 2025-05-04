import React from 'react';
import { Icon } from '@iconify/react';
import { useTheme } from "../context/theme-context";

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <Tooltip 
      content={`Switch to ${isDark ? "light" : "dark"} mode`}
      placement="bottom"
    >
      <div className="flex items-center gap-2 border border-default-100 rounded-full px-3 py-1.5 bg-content1">
        <Icon 
          icon={isDark ? "lucide:moon" : "lucide:sun"} 
          className={`w-4 h-4 ${isDark ? "text-primary" : "text-warning"}`} 
        />
        <Switch 
          isSelected={isDark}
          onValueChange={toggleTheme}
          size="sm"
          color="primary"
          className="mx-0.5"
        />
      </div>
    </Tooltip>
  );
};