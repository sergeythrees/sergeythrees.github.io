import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Card } from 'antd';
import type { Project } from '../data/types';
import { useT } from '../i18n/LocaleProvider';
import StackTags from './StackTags';
import { assetUrl } from './ScreenshotGallery';

/** Сколько тегов показываем в карточке, остальные — как «+N». */
const MAX_TAGS = 5;

interface ProjectCardProps {
  project: Project;
  /** 'task' — карточка тестового задания: бейдж и маршрут деталей из раздела employers. */
  kind?: 'project' | 'task';
}

export default function ProjectCard({ project, kind = 'project' }: ProjectCardProps) {
  const navigate = useNavigate();
  const t = useT();
  const tags = project.stack.slice(0, MAX_TAGS);
  const extra = project.stack.length - tags.length;
  const basePath = kind === 'task' ? '/employers/tasks' : '/projects';
  const detailPath = `${basePath}/${project.id}`;
  // На странице заданий метка «Тестовое задание» ничего не добавляет — её там не показываем.
  const badge = kind === 'task' ? undefined : project.badge;

  return (
    <Card hoverable variant="borderless" className="project-card">
      <div className="project-card__top">
        <Badge
          status={project.statusType}
          text={<span className="project-card__status">{project.status}</span>}
        />
        {project.appUrl || badge ? (
          <span className="project-card__badges">
            {project.appUrl ? <span className="project-card__demo">{t.common.demo}</span> : null}
            {badge ? <span className="project-card__demo">{badge}</span> : null}
          </span>
        ) : null}
      </div>

      <h3 className="project-card__title">
        <Link to={detailPath} className="project-card__link">
          {project.name}
        </Link>
      </h3>

      <p className="project-card__tagline">{project.tagline}</p>

      <StackTags items={tags} extra={extra} />

      <div className="project-card__actions">
        {/* Без живой ссылки «Открыть» и «Подробнее» вели бы на одну страницу — оставляем одну кнопку. */}
        {project.appUrl ? (
          <>
            <Button
              type="primary"
              href={assetUrl(project.appUrl)}
              target="_blank"
              rel="noreferrer noopener"
            >
              {kind === 'task' ? t.tasks.openStand : t.common.open}
            </Button>
            <Button type="text" onClick={() => navigate(detailPath)}>
              {t.common.details}
            </Button>
          </>
        ) : (
          <Button onClick={() => navigate(detailPath)}>{t.common.details}</Button>
        )}
      </div>
    </Card>
  );
}
