import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Drawer, Layout, Tooltip } from 'antd';
import {
  GithubOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import SideNav from './SideNav';
import { profile } from '../data/site';
import { projectsById } from '../data/projects';

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

  if (pathname === '/') {
    return 'Главная';
  }
  if (pathname === '/projects') {
    return 'Проекты';
  }
  if (pathname.startsWith('/projects/')) {
    const id = decodeURIComponent(pathname.slice('/projects/'.length));
    return projectsById[id]?.name ?? 'Проект не найден';
  }
  if (pathname === '/about') {
    return 'Обо мне';
  }
  if (pathname === '/contacts') {
    return 'Контакты';
  }
  return 'Страница не найдена';
}

const githubLink = profile.links.find((link) => link.label.toLowerCase() === 'github');
const githubHref = githubLink?.href ?? 'https://github.com/sergeythrees';
const mailHref = `mailto:${profile.email}`;

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();
  const pageTitle = usePageTitle();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
          styles={{ body: { padding: 0, background: '#111114' } }}
        >
          <SideNav collapsed={false} onNavigate={() => setDrawerOpen(false)} />
        </Drawer>
      ) : (
        <Sider
          className="app-sider"
          theme="dark"
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
              aria-label={isMobile ? 'Меню' : collapsed ? 'Развернуть сайдбар' : 'Свернуть сайдбар'}
            />
            <span className="app-header__title">{pageTitle}</span>
          </div>

          <div className="app-header__right">
            <Tooltip title="GitHub">
              <Button
                type="text"
                href={githubHref}
                target="_blank"
                rel="noreferrer noopener"
                icon={<GithubOutlined />}
                aria-label="GitHub"
              />
            </Tooltip>
            <Tooltip title={profile.email}>
              <Button
                type="text"
                href={mailHref}
                icon={<MailOutlined />}
                aria-label="Почта"
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
