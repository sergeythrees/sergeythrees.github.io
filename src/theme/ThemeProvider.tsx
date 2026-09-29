import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { theme as antdTheme, type ThemeConfig } from 'antd';
import type { ThemeMode } from './modes';

export const THEME_STORAGE_KEY = 'st.theme';

interface ThemeContextValue {
  mode: ThemeMode;
  antdTheme: ThemeConfig;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readInitialMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  // Тема из ссылки (?theme=light) важнее сохранённой: им делятся ссылкой.
  const fromQuery = new URLSearchParams(window.location.search).get('theme');
  if (fromQuery === 'light' || fromQuery === 'dark') {
    return fromQuery;
  }
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  // Сайт тёмный по умолчанию: светлая тема включается явно.
  return 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(readInitialMode);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    // Чтобы ссылкой можно было поделиться именно с нужной темой.
    const url = new URL(window.location.href);
    if (next === 'dark') {
      url.searchParams.delete('theme');
    } else {
      url.searchParams.set('theme', next);
    }
    window.history.replaceState(null, '', url);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setMode]);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    // Цвет системной панели браузера на мобильных.
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute('content', mode === 'dark' ? '#0b0b0d' : '#f7f7f8');
  }, [mode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      antdTheme: buildAntdTheme(mode),
      toggleMode,
      setMode,
    }),
    [mode, toggleMode, setMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Общие токены antd для обеих тем. */
function buildAntdTheme(mode: ThemeMode): ThemeConfig {
  const dark = mode === 'dark';

  return {
    algorithm: dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: '#4d8dfd',
      colorInfo: '#4d8dfd',
      colorSuccess: '#3ecf8e',
      colorWarning: '#e2a03f',
      colorError: '#f2555a',
      colorBgLayout: dark ? '#0b0b0d' : '#f4f4f6',
      colorBgContainer: dark ? '#17171a' : '#ffffff',
      colorBgElevated: dark ? '#1b1b20' : '#ffffff',
      colorBgSpotlight: dark ? '#202027' : '#2a2a33',
      colorText: dark ? '#e9e9ec' : '#17171a',
      colorTextSecondary: dark ? '#90909a' : '#5c5c66',
      colorTextTertiary: dark ? '#6b6b74' : '#787883',
      colorTextQuaternary: dark ? '#4e4e57' : '#9a9aa3',
      colorBorder: dark ? '#26262c' : '#e2e2e7',
      colorBorderSecondary: dark ? '#1e1e23' : '#ececf0',
      borderRadius: 10,
      controlHeight: 34,
      fontFamily:
        "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    },
    components: {
      Menu: {
        darkItemBg: 'transparent',
        darkItemSelectedBg: dark ? '#1e1e25' : '#e8effc',
        darkItemSelectedColor: dark ? '#ffffff' : '#1a56c4',
        darkItemHoverBg: dark ? '#17171b' : '#eef1f6',
        darkItemColor: dark ? '#b9b9c2' : '#45454f',
        darkGroupTitleColor: dark ? '#5f5f68' : '#8a8a93',
        // Подменю без отдельной подложки: вложенные пункты лежат на фоне сайдбара.
        darkSubMenuItemBg: 'transparent',
        subMenuItemBg: 'transparent',
        // Светлая тема: SideNav переключает Menu на theme="light".
        itemBg: 'transparent',
        itemSelectedBg: dark ? '#1e1e25' : '#e8effc',
        itemSelectedColor: dark ? '#ffffff' : '#1a56c4',
        itemHoverBg: dark ? '#17171b' : '#eef1f6',
        itemColor: dark ? '#b9b9c2' : '#45454f',
        groupTitleColor: dark ? '#5f5f68' : '#8a8a93',
        itemHeight: 34,
        itemMarginInline: 8,
        itemBorderRadius: 8,
        iconSize: 15,
        collapsedIconSize: 16,
      },
      Button: {
        fontWeight: 500,
        primaryShadow: 'none',
      },
      Card: {
        colorBgContainer: dark ? '#151518' : '#ffffff',
        headerBg: 'transparent',
      },
      Layout: {
        siderBg: dark ? '#111114' : '#fbfbfc',
        bodyBg: dark ? '#0b0b0d' : '#f4f4f6',
        headerBg: dark ? '#0d0d10' : '#ffffff',
      },
    },
  };
}

export function useThemeMode(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used inside <ThemeProvider>');
  }
  return context;
}
