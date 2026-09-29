import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Menu, type MenuProps } from 'antd';
import {
  AppstoreOutlined,
  FolderOutlined,
  HomeOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { projects, type ProjectStatusType } from '../data/projects';
import { profile } from '../data/site';

const PROJECTS_KEY = 'projects';
/** Ключ пункта «Проекты»: это и раздел меню, и маршрут /projects. */
const PROJECTS_PATH = '/projects';

const STATUS_CLASS: Record<ProjectStatusType, string> = {
  success: 'sidenav__dot--success',
  processing: 'sidenav__dot--processing',
  warning: 'sidenav__dot--warning',
  default: 'sidenav__dot--default',
};

function StatusDot({ type }: { type: ProjectStatusType }) {
  return <span className={`sidenav__dot ${STATUS_CLASS[type]}`} />;
}

interface SideNavProps {
  collapsed: boolean;
  /** Вызывается после перехода — на мобильном так закрывается Drawer. */
  onNavigate?: () => void;
}

export default function SideNav({ collapsed, onNavigate }: SideNavProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState<string[]>([PROJECTS_KEY]);

  const items = useMemo<MenuProps['items']>(
    () => [
      {
        key: '/',
        icon: <HomeOutlined />,
        label: <Link to="/">Главная</Link>,
      },
      {
        key: PROJECTS_KEY,
        icon: <FolderOutlined />,
        label: <Link to={PROJECTS_PATH}>Проекты</Link>,
        children: projects.map((project) => ({
          key: `/projects/${project.id}`,
          icon: <StatusDot type={project.statusType} />,
          label: <Link to={`/projects/${project.id}`}>{project.name}</Link>,
        })),
      },
      {
        key: '/about',
        icon: <UserOutlined />,
        label: <Link to="/about">Обо мне</Link>,
      },
      {
        key: '/contacts',
        icon: <MessageOutlined />,
        label: <Link to="/contacts">Контакты</Link>,
      },
    ],
    [],
  );

  // Активный пункт: точный маршрут; на /projects подсвечиваем сам раздел.
  const selectedKeys = pathname === PROJECTS_PATH ? [PROJECTS_KEY] : [pathname];

  return (
    <nav className="sidenav">
      <div className="sidenav__brand">
        <span className="sidenav__avatar" aria-hidden="true">
          SS
        </span>
        {collapsed ? null : (
          <span className="sidenav__identity">
            <span className="sidenav__name">{profile.name}</span>
            <span className="sidenav__handle">{profile.handle}</span>
          </span>
        )}
      </div>

      <div className="sidenav__top">
        <Button
          type="primary"
          block
          icon={<AppstoreOutlined />}
          className="sidenav__cta"
          onClick={() => {
            navigate('/projects');
            onNavigate?.();
          }}
        >
          {collapsed ? null : 'Обзор проектов'}
        </Button>
      </div>

      {collapsed ? null : <div className="sidenav__section">Разделы</div>}

      <Menu
        className="sidenav__menu"
        mode="inline"
        theme="dark"
        selectable
        items={items}
        selectedKeys={selectedKeys}
        // При сворачивании antd сам управляет popup-подменю, openKeys ему мешают.
        {...(collapsed
          ? {}
          : {
              openKeys,
              onOpenChange: (keys: string[]) => setOpenKeys(keys),
            })}
        onClick={({ key }) => {
          // Клик по заголовку подменю не должен закрывать Drawer.
          if (key !== PROJECTS_KEY) {
            onNavigate?.();
          }
        }}
      />
    </nav>
  );
}
