import React from 'react';
import { useTheme } from '../context/theme-context';
import { Card, CardBody } from '@heroui/react';

interface ThemeAwareComponentProps {
  lightContent: React.ReactNode;
  darkContent: React.ReactNode;
  className?: string;
}

/**
 * ThemeAwareComponent
 * 
 * A component that renders different content based on the current theme
 */
export const ThemeAwareComponent: React.FC<ThemeAwareComponentProps> = ({
  lightContent,
  darkContent,
  className = ''
}) => {
  const { resolvedTheme } = useTheme();
  
  return (
    <Card className={className}>
      <CardBody>
        {resolvedTheme === 'light' ? lightContent : darkContent}
      </CardBody>
    </Card>
  );
};

/**
 * Example usage:
 * 
 * <ThemeAwareComponent
 *   lightContent={<p>This is shown in light mode</p>}
 *   darkContent={<p>This is shown in dark mode</p>}
 * />
 */