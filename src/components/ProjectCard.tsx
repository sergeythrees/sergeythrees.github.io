import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Card } from 'antd';
import type { Project } from '../data/types';
import { useT } from '../i18n/LocaleProvider';
import StackTags from './StackTags';

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
  const badgeText = project.status;

  return (
    <Card hoverable variant="borderless" className="project-card">
      <div className="project-card__top">
        <Badge
          status={project.statusType}
          text={<span className="project-card__status">{badgeText}</span>}
        />
        {project.appUrl ? <span className="project-card__demo">{t.common.demo}</span> : null}
        {kind === 'task' || project.badge ? (
          <span className="project-card__demo">{project.badge ?? t.tasks.badge}</span>
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
        {project.appUrl ? (
          <Button
            type="primary"
            href={project.appUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            {t.common.open}
          </Button>
        ) : (
          <Button onClick={() => navigate(detailPath)}>{t.common.open}</Button>
        )}
        <Button type="text" onClick={() => navigate(detailPath)}>
          {t.common.details}
        </Button>
      </div>
    </Card>
  );
}
