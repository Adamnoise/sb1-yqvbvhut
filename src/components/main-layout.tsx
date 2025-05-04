import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Icon } from '@iconify/react';
// Replace NextUI components with simpler implementations
import { Sidebar } from './sidebar';
import { ThemeSwitcher } from './theme-switcher';
import { useTheme } from '../context/theme-context';
import { Header } from './header';

interface MainLayoutProps {
  children: React.ReactNode;
}

// Create a context for layout
export const LayoutContext = createContext<{
  isDesktop: boolean;
  isMobile: boolean;
  activeSection: string;
  setActiveSection: (section: string) => void;
}>({
  isDesktop: true,
  isMobile: false,
  activeSection: 'dashboard',
  setActiveSection: () => {}
});

// Export the hook for consuming components
export const useLayout = () => {
  const context = useContext(LayoutContext);
  
  if (context === undefined) {
    throw new Error('useLayout must be used within a MainLayout');
  }
  
  return context;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar collapsed={isSidebarCollapsed} />
      
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
        {children}
      </div>
    </div>
  );
};

// Basic tooltip component implementation
const Tooltip = ({ content, children }: { content: string, children: React.ReactNode }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div className="absolute z-10 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg -top-8 left-1/2 transform -translate-x-1/2">
          {content}
        </div>
      )}
    </div>
  );
};

// Simple input component
const Input = ({ 
  placeholder, 
  className, 
  startContent 
}: { 
  placeholder: string, 
  className?: string, 
  startContent?: React.ReactNode 
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      {startContent && (
        <div className="absolute left-3">{startContent}</div>
      )}
      <input
        type="text"
        className={`rounded-full px-4 py-2 pl-10 border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
        placeholder={placeholder}
      />
    </div>
  );
};

// Simplified Button component
const Button = ({ 
  children, 
  variant = "default", 
  className = "", 
  isIconOnly = false
}: { 
  children: React.ReactNode, 
  variant?: string, 
  className?: string,
  isIconOnly?: boolean
}) => {
  const baseStyles = "rounded-md px-4 py-2 font-medium transition-colors";
  const variantStyles = {
    default: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    light: "bg-transparent hover:bg-gray-100 text-gray-600",
    flat: "bg-gray-100 hover:bg-gray-200 text-gray-800",
  };
  
  const iconStyles = isIconOnly ? "p-2" : "";
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant as keyof typeof variantStyles]} ${iconStyles} ${className}`}
    >
      {children}
    </button>
  );
};

// Custom hook for media queries
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);
  
  return matches;
}

// Add simplified KeyboardShortcutsButton component
export const KeyboardShortcutsButton = () => {
  return (
    <Tooltip content="Keyboard shortcuts (press ? to open)">
      <Button 
        isIconOnly 
        variant="flat" 
        className="bg-gray-100 border border-gray-200 rounded-full p-2"
      >
        <Icon icon="lucide:keyboard" className="w-5 h-5 text-gray-500" />
      </Button>
    </Tooltip>
  );
};