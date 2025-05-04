import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button, Divider } from '@heroui/react';
import { ThemeSwitcher } from '../context/theme-context';
import { ThemeDropdown } from './theme-dropdown';
import { ThemeToggleButton } from './theme-toggle-button';
import { ThemeSelector } from './theme-selector';
import { ThemeAwareComponent } from './theme-aware-component';
import { useThemeColor } from '../hooks/use-theme-effect';

/**
 * ThemeDemo Component
 * 
 * A comprehensive demo of all theme components
 */
export const ThemeDemo: React.FC = () => {
  // Set theme-color meta tag based on theme
  useThemeColor('#ffffff', '#0f1117');
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Theme System Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Theme Switcher Variants</h2>
          </CardHeader>
          <CardBody className="flex flex-col gap-6">
            <div>
              <h3 className="text-md font-medium mb-3">Icon Variant</h3>
              <div className="flex items-center gap-4">
                <ThemeSwitcher variant="icon" size="sm" />
                <ThemeSwitcher variant="icon" size="md" />
                <ThemeSwitcher variant="icon" size="lg" />
              </div>
            </div>
            
            <Divider />
            
            <div>
              <h3 className="text-md font-medium mb-3">Switch Variant</h3>
              <ThemeSwitcher variant="switch" />
            </div>
            
            <Divider />
            
            <div>
              <h3 className="text-md font-medium mb-3">Dropdown Variant</h3>
              <ThemeSwitcher variant="dropdown" />
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Additional Theme Components</h2>
          </CardHeader>
          <CardBody className="flex flex-col gap-6">
            <div>
              <h3 className="text-md font-medium mb-3">Theme Dropdown</h3>
              <div className="flex flex-wrap gap-2">
                <ThemeDropdown />
                <ThemeDropdown buttonVariant="flat" buttonColor="primary" />
                <ThemeDropdown buttonVariant="solid" buttonColor="primary" />
              </div>
            </div>
            
            <Divider />
            
            <div>
              <h3 className="text-md font-medium mb-3">Theme Toggle Button</h3>
              <div className="flex flex-wrap gap-2">
                <ThemeToggleButton iconOnly />
                <ThemeToggleButton />
                <ThemeToggleButton variant="solid" color="primary" />
              </div>
            </div>
            
            <Divider />
            
            <div>
              <h3 className="text-md font-medium mb-3">Theme Selector (Radio)</h3>
              <ThemeSelector />
            </div>
          </CardBody>
        </Card>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-semibold">Theme-Aware Content</h2>
        </CardHeader>
        <CardBody>
          <ThemeAwareComponent
            lightContent={
              <div className="p-4 bg-primary-100 text-primary-800 rounded-lg">
                <h3 className="font-medium mb-2">Light Mode Content</h3>
                <p>This content is only visible in light mode. It uses lighter colors that work well with light backgrounds.</p>
              </div>
            }
            darkContent={
              <div className="p-4 bg-primary-900 text-primary-100 rounded-lg">
                <h3 className="font-medium mb-2">Dark Mode Content</h3>
                <p>This content is only visible in dark mode. It uses darker colors that work well with dark backgrounds.</p>
              </div>
            }
          />
        </CardBody>
      </Card>
      
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Theme System Features</h2>
        </CardHeader>
        <CardBody>
          <ul className="list-disc pl-5 space-y-2">
            <li>Automatic system theme detection</li>
            <li>Theme persistence using localStorage</li>
            <li>SSR compatibility with graceful fallbacks</li>
            <li>Smooth theme transitions</li>
            <li>Multiple theme selection UI components</li>
            <li>Accessible with proper ARIA attributes</li>
            <li>TypeScript support with proper types</li>
            <li>Optimized with React.memo and useCallback</li>
            <li>Custom hooks for theme-related effects</li>
          </ul>
        </CardBody>
        <CardFooter>
          <Button color="primary">Learn More</Button>
        </CardFooter>
      </Card>
    </div>
  );
};