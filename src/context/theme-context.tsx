// theme-context.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react';

type Theme = 'light' | 'dark';
type ThemeSetting = Theme | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: ThemeSetting) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'app-theme';

const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const ThemeProvider: React.FC<{ children: React.ReactNode; defaultTheme?: ThemeSetting }> = ({
  children,
  defaultTheme = 'system'
}) => {
  const [themeSetting, setThemeSetting] = useState<ThemeSetting>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeSetting | null;
      if (stored) return stored;
      if (defaultTheme === 'system') return getSystemTheme();
    }
    return defaultTheme;
  });

  const resolvedTheme: Theme = themeSetting === 'system' ? getSystemTheme() : themeSetting;

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    applyTheme(resolvedTheme);
    if (themeSetting !== 'system') {
      localStorage.setItem(THEME_STORAGE_KEY, themeSetting);
    } else {
      localStorage.removeItem(THEME_STORAGE_KEY);
    }
  }, [resolvedTheme, themeSetting]);

  useEffect(() => {
    if (defaultTheme !== 'system' || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (themeSetting === 'system') {
        applyTheme(getSystemTheme());
      }
    };

    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, [themeSetting, defaultTheme]);

  const toggleTheme = useCallback(() => {
    setThemeSetting((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setTheme = useCallback((theme: ThemeSetting) => {
    setThemeSetting(theme);
  }, []);

  const contextValue = useMemo(
    () => ({
      theme: themeSetting,
      resolvedTheme,
      toggleTheme,
      setTheme
    }),
    [themeSetting, resolvedTheme, toggleTheme, setTheme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};