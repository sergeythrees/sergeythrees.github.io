import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Card } from 'antd';
import type { Project } from '../data/projects';
import StackTags from './StackTags';

/** Сколько тегов показываем в карточке, остальные — как «+N». */
const MAX_TAGS = 5;

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const tags = project.stack.slice(0, MAX_TAGS);
  const extra = project.stack.length - tags.length;
  const detailPath = `/projects/${project.id}`;

  return (
    <Card hoverable variant="borderless" className="project-card">
      <div className="project-card__top">
        <Badge
          status={project.statusType}
          text={<span className="project-card__status">{project.status}</span>}
        />
        {project.appUrl ? <span className="project-card__demo">демо</span> : null}
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
            Открыть
          </Button>
        ) : (
          <Button onClick={() => navigate(detailPath)}>Открыть</Button>
        )}
        <Button type="text" onClick={() => navigate(detailPath)}>
          Подробнее
        </Button>
      </div>
    </Card>
  );
}
