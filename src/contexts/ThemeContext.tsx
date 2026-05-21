import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeType = 'gold' | 'blue' | 'purple' | 'green';

interface ThemeColors {
  primary: string;
  secondary: string;
  gradient: string;
  shadow: string;
  name: string;
  emoji: string;
}

const themes: Record<ThemeType, ThemeColors> = {
  gold: {
    primary: '#D4A017',
    secondary: '#F5C842',
    gradient: 'linear-gradient(135deg, #D4A017, #F5C842)',
    shadow: 'rgba(212, 160, 23, 0.3)',
    name: 'Dourado Clássico',
    emoji: '👑',
  },
  blue: {
    primary: '#3B82F6',
    secondary: '#60A5FA',
    gradient: 'linear-gradient(135deg, #3B82F6, #60A5FA)',
    shadow: 'rgba(59, 130, 246, 0.3)',
    name: 'Azul Celeste',
    emoji: '💎',
  },
  purple: {
    primary: '#8B5CF6',
    secondary: '#A78BFA',
    gradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)',
    shadow: 'rgba(139, 92, 246, 0.3)',
    name: 'Roxo Real',
    emoji: '🔮',
  },
  green: {
    primary: '#10B981',
    secondary: '#34D399',
    gradient: 'linear-gradient(135deg, #10B981, #34D399)',
    shadow: 'rgba(16, 185, 129, 0.3)',
    name: 'Verde Esperança',
    emoji: '🌿',
  },
};

interface ThemeContextType {
  theme: ThemeType;
  colors: ThemeColors;
  setTheme: (theme: ThemeType) => void;
  themes: typeof themes;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>('gold');

  useEffect(() => {
    const saved = localStorage.getItem('im-theme') as ThemeType;
    if (saved && themes[saved]) {
      setThemeState(saved);
    }
  }, []);

  useEffect(() => {
    const colors = themes[theme];
    document.documentElement.style.setProperty('--theme-primary', colors.primary);
    document.documentElement.style.setProperty('--theme-secondary', colors.secondary);
    document.documentElement.style.setProperty('--theme-gradient', colors.gradient);
    document.documentElement.style.setProperty('--theme-shadow', colors.shadow);
  }, [theme]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('im-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, colors: themes[theme], setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
