import React from 'react';
import * as LucideIcons from 'lucide-react';

// Type for supported icon names
type IconName = keyof typeof LucideIcons;

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ 
  name, 
  className = "", 
  size = 24 
}) => {
  // Convert first letter to uppercase to match Lucide's naming convention
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  
  // Check if the icon exists in lucide-react
  const IconComponent = LucideIcons[formattedName as IconName];
  
  if (!IconComponent) {
    // Fallback to a default icon or null
    return <LucideIcons.HelpCircle className={className} size={size} />;
  }
  
  return <IconComponent className={className} size={size} />;
};