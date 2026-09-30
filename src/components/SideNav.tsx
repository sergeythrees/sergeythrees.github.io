import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Menu, type MenuProps } from 'antd';
import {
  AppstoreOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  FolderOutlined,
  HomeOutlined,
  IdcardOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ProjectStatusType } from '../data/types';
import { useLocale } from '../i18n/LocaleProvider';
import { useThemeMode } from '../theme/ThemeProvider';
import { assetUrl } from './ScreenshotGallery';

const PROJECTS_KEY = 'projects';
const EMPLOYERS_KEY = 'employers';
/** Ключ пункта «Проекты»: это и раздел меню, и маршрут /projects. */
const PROJECTS_PATH = '/projects';
const EMPLOYERS_PATH = '/employers';
/** Ключ вложенного подменю с тестовыми заданиями. */
const TASKS_KEY = '/employers/tasks';
/** Ключи разделов: по ним клик не закрывает мобильный Drawer. */
const SECTION_KEYS = [PROJECTS_KEY, EMPLOYERS_KEY, TASKS_KEY];

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
  const { content, t } = useLocale();
  const { mode } = useThemeMode();
  const { projects, tasks } = content;
  // Разделы раскрыты по умолчанию; дальше состоянием управляет пользователь,
  // а ветку с текущей страницей мы всегда держим раскрытой.
  const [openKeys, setOpenKeys] = useState<string[]>([PROJECTS_KEY, EMPLOYERS_KEY]);

  const items = useMemo<MenuProps['items']>(
    () => [
      {
        key: '/',
        icon: <HomeOutlined />,
        label: <Link to="/">{t.nav.home}</Link>,
      },
      {
        key: PROJECTS_KEY,
        icon: <FolderOutlined />,
        label: <Link to={PROJECTS_PATH}>{t.nav.projects}</Link>,
        children: projects.map((project) => ({
          key: `/projects/${project.id}`,
          icon: <StatusDot type={project.statusType} />,
          label: <Link to={`/projects/${project.id}`}>{project.name}</Link>,
        })),
      },
      {
        key: EMPLOYERS_KEY,
        icon: <IdcardOutlined />,
        label: <Link to={EMPLOYERS_PATH}>{t.nav.employers}</Link>,
        children: [
          {
            key: '/employers/resume',
            icon: <FileTextOutlined />,
            label: <Link to="/employers/resume">{t.nav.resume}</Link>,
          },
          {
            key: '/employers/tasks',
            icon: <ExperimentOutlined />,
            label: <Link to="/employers/tasks">{t.nav.tasks}</Link>,
            // Задания показываем вложенным уровнем, чтобы был виден состав раздела.
            children: tasks.map((task) => ({
              key: `/employers/tasks/${task.id}`,
              icon: <StatusDot type={task.statusType} />,
              label: <Link to={`/employers/tasks/${task.id}`}>{task.name}</Link>,
            })),
          },
        ],
      },
      {
        key: '/about',
        icon: <UserOutlined />,
        label: <Link to="/about">{t.nav.about}</Link>,
      },
      {
        key: '/contacts',
        icon: <MessageOutlined />,
        label: <Link to="/contacts">{t.nav.contacts}</Link>,
      },
    ],
    [projects, tasks, t],
  );

  // Активный пункт: точный маршрут; на /projects и /employers подсвечиваем сам раздел.
  // Разделы, внутри которых лежит текущая страница: их нужно раскрыть,
  // иначе при прямом заходе по ссылке активный пункт не виден.
  const routeOpenKeys = useMemo(() => {
    const keys: string[] = [];
    if (pathname === PROJECTS_PATH || pathname.startsWith(`${PROJECTS_PATH}/`)) {
      keys.push(PROJECTS_KEY);
    }
    if (pathname === EMPLOYERS_PATH || pathname.startsWith(`${EMPLOYERS_PATH}/`)) {
      keys.push(EMPLOYERS_KEY);
    }
    if (pathname.startsWith(`${EMPLOYERS_PATH}/tasks`)) {
      keys.push(TASKS_KEY);
    }
    return keys;
  }, [pathname]);

  const mergedOpenKeys = useMemo(
    () => Array.from(new Set([...openKeys, ...routeOpenKeys])),
    [openKeys, routeOpenKeys],
  );

  const selectedKeys =
    pathname === PROJECTS_PATH
      ? [PROJECTS_KEY]
      : pathname === EMPLOYERS_PATH
        ? [EMPLOYERS_KEY]
        : [pathname];

  return (
    <nav className="sidenav">
      <div className="sidenav__brand">
        <img className="sidenav__avatar" src={assetUrl('photo.jpg')} alt="" width={32} height={32} />
        {collapsed ? null : (
          <span className="sidenav__identity">
            <span className="sidenav__name">{content.site.name}</span>
            <span className="sidenav__handle">{content.site.handle}</span>
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
          {collapsed ? null : t.nav.cta}
        </Button>
      </div>

      {collapsed ? null : <div className="sidenav__section">{t.nav.sections}</div>}

      <Menu
        className="sidenav__menu"
        mode="inline"
        theme={mode === 'dark' ? 'dark' : 'light'}
        selectable
        items={items}
        selectedKeys={selectedKeys}
        // При сворачивании antd сам управляет popup-подменю, openKeys ему мешают.
        {...(collapsed
          ? {}
          : {
              openKeys: mergedOpenKeys,
              onOpenChange: (keys: string[]) => setOpenKeys(keys),
            })}
        onClick={({ key }) => {
          // Клик по заголовку раздела не должен закрывать Drawer.
          if (!SECTION_KEYS.includes(key)) {
            onNavigate?.();
          }
        }}
      />
    </nav>
  );
}
