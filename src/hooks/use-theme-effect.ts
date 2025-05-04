import { useEffect } from 'react';
import { useTheme } from '../context/theme-context';

type Theme = 'light' | 'dark';

/**
 * Runs a callback whenever the theme changes.
 * 
 * @param callback Callback with the current theme.
 */
export function useThemeEffect(callback: (theme: Theme) => void): void {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
    callback(resolvedTheme);
  }, [resolvedTheme, callback]);
}

/**
 * Adds a class to <body> based on the current theme.
 * 
 * @param lightClass Class for light theme.
 * @param darkClass Class for dark theme.
 */
export function useThemeClass(lightClass: string, darkClass: string): void {
  useThemeEffect((theme) => {
    if (typeof document === 'undefined') return;

    const classList = document.body.classList;
    classList.remove(lightClass, darkClass);
    classList.add(theme === 'light' ? lightClass : darkClass);
  });
}

/**
 * Sets the <meta name="theme-color"> content based on theme.
 * 
 * @param lightColor Color for light mode.
 * @param darkColor Color for dark mode.
 */
export function useThemeColor(lightColor: string, darkColor: string): void {
  useThemeEffect((theme) => {
    if (typeof document === 'undefined') return;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }

    meta.content = theme === 'light' ? lightColor : darkColor;
  });
}
