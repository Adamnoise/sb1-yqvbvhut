// New file for Sonner toast provider
import React from 'react';
import { Toaster } from 'sonner';
import { useTheme } from '../../context/theme-context';

export const SonnerToastProvider = () => {
  const { theme } = useTheme();
  
  return (
    <Toaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      theme={theme as 'light' | 'dark'}
      toastOptions={{
        style: {
          fontSize: '14px',
        },
        duration: 4000,
      }}
    />
  );
};