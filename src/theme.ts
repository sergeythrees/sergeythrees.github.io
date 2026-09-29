import { theme, type ThemeConfig } from 'antd';

/**
 * Единая тёмная тема antd: почти чёрный фон, тонкие границы,
 * приглушённый синий акцент.
 */
export const themeConfig: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#4d8dfd',
    colorInfo: '#4d8dfd',
    colorSuccess: '#3ecf8e',
    colorWarning: '#e2a03f',
    colorError: '#f2555a',
    colorBgLayout: '#0b0b0d',
    colorBgContainer: '#17171a',
    colorBgElevated: '#1b1b20',
    colorBgSpotlight: '#202027',
    colorText: '#e9e9ec',
    colorTextSecondary: '#90909a',
    colorTextTertiary: '#6b6b74',
    colorTextQuaternary: '#4e4e57',
    colorBorder: '#26262c',
    colorBorderSecondary: '#1e1e23',
    borderRadius: 10,
    controlHeight: 34,
    fontFamily:
      'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Menu: {
      darkItemBg: 'transparent',
      darkItemSelectedBg: '#1e1e25',
      darkItemSelectedColor: '#ffffff',
      darkItemHoverBg: '#17171b',
      darkItemColor: '#b9b9c2',
      darkGroupTitleColor: '#5f5f68',
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
      colorBgContainer: '#151518',
      headerBg: 'transparent',
    },
    Layout: {
      siderBg: '#111114',
      bodyBg: '#0b0b0d',
      headerBg: '#0d0d10',
    },
  },
};
