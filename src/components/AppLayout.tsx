import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Drawer, Dropdown, Layout, Tooltip, type MenuProps } from 'antd';
import {
  GithubOutlined,
  GlobalOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import SideNav from './SideNav';
import { useLocale } from '../i18n/LocaleProvider';
import { LOCALES, LOCALE_META, isLocale } from '../i18n/locales';
import { useThemeMode } from '../theme/ThemeProvider';

const { Header, Content, Sider } = Layout;

/** Ниже этой ширины сайдбар превращается в выезжающую панель. */
const MOBILE_QUERY = '(max-width: 899px)';

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    setIsMobile(query.matches);
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
}

/** Заголовок шапки — по текущему маршруту. */
function usePageTitle(): string {
  const { pathname } = useLocation();
  const { content, t } = useLocale();

  if (pathname === '/') {
    return t.nav.home;
  }
  if (pathname === '/projects') {
    return t.nav.projects;
  }
  if (pathname.startsWith('/projects/')) {
    const id = decodeURIComponent(pathname.slice('/projects/'.length));
    const project = content.projects.find((entry) => entry.id === id);
    return project?.name ?? t.notFound.title;
  }
  if (pathname === '/employers') {
    return t.nav.employers;
  }
  if (pathname.startsWith('/employers/resume')) {
    return t.nav.resume;
  }
  if (pathname.startsWith('/employers/tasks')) {
    const id = pathname.slice('/employers/tasks'.length).replace(/^\//, '');
    const task = content.tasks.find((entry) => entry.id === decodeURIComponent(id));
    return task?.name ?? t.nav.tasks;
  }
  if (pathname === '/about') {
    return t.nav.about;
  }
  if (pathname === '/contacts') {
    return t.nav.contacts;
  }
  return t.notFound.title;
}

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();
  const pageTitle = usePageTitle();
  const { locale, content, t, setLocale } = useLocale();
  const { mode, toggleMode } = useThemeMode();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Заголовок вкладки и вкладки браузера следуют за страницей и языком.
  useEffect(() => {
    document.title = `${pageTitle} · ${content.site.name}`;
  }, [pageTitle, content.site.name]);

  const handleToggle = () => {
    if (isMobile) {
      setDrawerOpen((open) => !open);
      return;
    }
    setCollapsed((value) => !value);
  };

  // Ушли с мобильной ширины — панель закрываем, иначе она откроется сама при возврате.
  useEffect(() => {
    if (!isMobile) {
      setDrawerOpen(false);
    }
  }, [isMobile]);

  const toggleIcon = isMobile || collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;
  const toggleLabel = isMobile
    ? t.ui.menu
    : collapsed
      ? t.ui.expandSidebar
      : t.ui.collapseSidebar;

  const githubHref =
    content.site.links.find((link) => link.label.toLowerCase() === 'github')?.href ??
    'https://github.com/sergeythrees';
  const mailHref = `mailto:${content.site.email}`;

  const localeItems: MenuProps['items'] = LOCALES.map((code) => {
    const meta = LOCALE_META[code];
    return {
      key: meta.code,
      label: (
        <span className="control-menu__item">
          <span className="control-menu__label">{meta.label}</span>
          <span className="control-menu__hint">{meta.hint}</span>
        </span>
      ),
    };
  });

  return (
    <Layout className="app-layout">
      {isMobile ? (
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          placement="left"
          size={280}
          closable={false}
          className="app-drawer"
          styles={{ body: { padding: 0, background: 'var(--bg-sider)' } }}
        >
          <SideNav collapsed={false} onNavigate={() => setDrawerOpen(false)} />
        </Drawer>
      ) : (
        <Sider
          className="app-sider"
          theme={mode === 'dark' ? 'dark' : 'light'}
          collapsible
          collapsed={collapsed}
          width={280}
          collapsedWidth={76}
          trigger={null}
        >
          <SideNav collapsed={collapsed} />
        </Sider>
      )}

      <Layout>
        <Header className="app-header">
          <div className="app-header__left">
            <Button
              type="text"
              className="app-header__toggle"
              icon={toggleIcon}
              onClick={handleToggle}
              aria-label={toggleLabel}
            />
            <span className="app-header__title">{pageTitle}</span>
          </div>

          <div className="app-header__right">
            <Dropdown
              trigger={['click']}
              placement="bottomRight"
              menu={{
                items: localeItems,
                selectedKeys: [locale],
                onClick: ({ key }) => {
                  if (isLocale(key)) {
                    setLocale(key);
                  }
                },
              }}
            >
              <Tooltip title={t.ui.language}>
                <Button
                  type="text"
                  className="control-btn"
                  icon={<GlobalOutlined />}
                  aria-label={t.ui.languageSwitchAria}
                />
              </Tooltip>
            </Dropdown>

            <Tooltip title={mode === 'dark' ? t.ui.themeLight : t.ui.themeDark}>
              <Button
                type="text"
                className="control-btn"
                icon={mode === 'dark' ? <MoonOutlined /> : <SunOutlined />}
                onClick={toggleMode}
                aria-label={t.ui.themeSwitchAria}
              />
            </Tooltip>

            <Tooltip title={t.common.github}>
              <Button
                type="text"
                className="control-btn"
                href={githubHref}
                target="_blank"
                rel="noreferrer noopener"
                icon={<GithubOutlined />}
                aria-label={t.common.github}
              />
            </Tooltip>
            <Tooltip title={content.site.email}>
              <Button
                type="text"
                className="control-btn"
                href={mailHref}
                icon={<MailOutlined />}
                aria-label={t.common.email}
              />
            </Tooltip>
          </div>
        </Header>

        <Content className="app-content">
          <div className="page-container">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
