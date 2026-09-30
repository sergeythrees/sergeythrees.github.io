import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

interface Crumb {
  label: string;
  to: string;
}

interface PageTitle {
  title: string;
  /** Родительские разделы — в шапке это ссылки перед названием страницы. */
  parents: Crumb[];
}

/** Заголовок шапки и путь к странице — по текущему маршруту. */
function usePageTitle(): PageTitle {
  const { pathname } = useLocation();
  const { content, t } = useLocale();
  const projects: Crumb = { label: t.nav.projects, to: '/projects' };
  const employers: Crumb = { label: t.nav.employers, to: '/employers' };
  const tasks: Crumb = { label: t.nav.tasks, to: '/employers/tasks' };

  if (pathname === '/') {
    return { title: t.nav.home, parents: [] };
  }
  if (pathname === '/projects') {
    return { title: t.nav.projects, parents: [] };
  }
  if (pathname.startsWith('/projects/')) {
    const id = decodeURIComponent(pathname.slice('/projects/'.length));
    const project = content.projects.find((entry) => entry.id === id);
    return { title: project?.name ?? t.notFound.title, parents: [projects] };
  }
  if (pathname === '/employers') {
    return { title: t.nav.employers, parents: [] };
  }
  if (pathname.startsWith('/employers/resume')) {
    return { title: t.nav.resume, parents: [employers] };
  }
  if (pathname === '/employers/tasks') {
    return { title: t.nav.tasks, parents: [employers] };
  }
  if (pathname.startsWith('/employers/tasks/')) {
    const id = decodeURIComponent(pathname.slice('/employers/tasks/'.length));
    const task = content.tasks.find((entry) => entry.id === id);
    return { title: task?.name ?? t.notFound.title, parents: [employers, tasks] };
  }
  if (pathname === '/about') {
    return { title: t.nav.about, parents: [] };
  }
  if (pathname === '/contacts') {
    return { title: t.nav.contacts, parents: [] };
  }
  return { title: t.notFound.title, parents: [] };
}

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();
  const { title: pageTitle, parents } = usePageTitle();
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
            <nav className="app-header__title" aria-label="breadcrumb">
              {parents.map((crumb) => (
                <span key={crumb.to} className="app-header__parent">
                  <Link to={crumb.to} className="app-header__crumb">
                    {crumb.label}
                  </Link>
                  <span className="app-header__sep" aria-hidden="true">
                    /
                  </span>
                </span>
              ))}
              <span className="app-header__current">{pageTitle}</span>
            </nav>
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
                // Иконка показывает, что будет после нажатия, как и подсказка.
                icon={mode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
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
