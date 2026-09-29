import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row, Tooltip } from 'antd';
import { ArrowLeftOutlined, ExportOutlined } from '@ant-design/icons';
import { projects, projectsById } from '../data/projects';
import PageHeader from '../components/PageHeader';
import StackTags from '../components/StackTags';
import ScreenshotGallery from '../components/ScreenshotGallery';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectsById[id] : undefined;

  // Неизвестный id — аккуратная заглушка вместо пустой страницы.
  if (!project) {
    return (
      <div className="empty-state">
        <div className="empty-state__code">404</div>
        <h1 className="empty-state__title">Проект не найден</h1>
        <p className="empty-state__text">
          Возможно, ссылка устарела или в адресе опечатка.
        </p>
        <Link to="/projects">
          <Button type="primary" icon={<ArrowLeftOutlined />}>
            Все проекты
          </Button>
        </Link>
      </div>
    );
  }

  const index = projects.findIndex((item) => item.id === project.id);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Link to="/projects" className="back-link">
        <Button type="text" size="small" icon={<ArrowLeftOutlined />}>
          Все проекты
        </Button>
      </Link>

      <PageHeader
        eyebrow={project.status}
        title={project.name}
        subtitle={project.tagline}
        actions={
          <div className="detail-actions">
            {project.appUrl ? (
              <Button
                type="primary"
                size="large"
                icon={<ExportOutlined />}
                href={project.appUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                Открыть приложение
              </Button>
            ) : (
              <Tooltip title={project.runNote ?? 'Приложение запускается локально'}>
                <span className="tooltip-target">
                  <Button size="large" disabled>
                    Приложение запускается локально
                  </Button>
                </span>
              </Tooltip>
            )}

            {project.links.map((link) => (
              <div key={link.href} className="detail-actions__item">
                <Button
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  icon={<ExportOutlined />}
                >
                  {link.label}
                </Button>
                {link.hint ? <span className="detail-actions__hint">{link.hint}</span> : null}
              </div>
            ))}
            {!project.appUrl ? (
              <p className="detail-actions__note">
                Публичного стенда пока нет — как запустить проект локально, написано ниже.
              </p>
            ) : null}
          </div>
        }
      />

      <section className="section">
        <Row gutter={[16, 16]}>
          {project.facts.map((fact) => (
            <Col key={fact.label} xs={24} sm={12} lg={8}>
              <div className="fact">
                <div className="fact__label">{fact.label}</div>
                <div className="fact__value">{fact.value}</div>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      <section className="section">
        <h2 className="section__title">Стек</h2>
        <StackTags items={project.stack} />
      </section>

      <section className="section">
        <h2 className="section__title">Что умеет</h2>
        <ul className="feature-list">
          {project.features.map((feature) => (
            <li key={feature} className="feature-list__item">
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 className="section__title">О проекте</h2>
        <p className="section__lead">{project.summary}</p>
        {project.details.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="section__paragraph">
            {paragraph}
          </p>
        ))}
      </section>

      {project.runCommands?.length ? (
        <section className="section">
          <h2 className="section__title">Запуск локально</h2>
          {project.runNote ? <p className="section__lead">{project.runNote}</p> : null}
          <pre className="run-commands">{project.runCommands.join('\n')}</pre>
        </section>
      ) : null}

      <ScreenshotGallery screenshots={project.screenshots} note={project.galleryNote} />

      <section className="section">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Link to={`/projects/${prev.id}`} className="project-nav">
              <span className="project-nav__label">← Предыдущий</span>
              <span className="project-nav__name">{prev.name}</span>
              <span className="project-nav__tagline">{prev.tagline}</span>
            </Link>
          </Col>
          <Col xs={24} md={12}>
            <Link to={`/projects/${next.id}`} className="project-nav project-nav--next">
              <span className="project-nav__label">Следующий →</span>
              <span className="project-nav__name">{next.name}</span>
              <span className="project-nav__tagline">{next.tagline}</span>
            </Link>
          </Col>
        </Row>
      </section>
    </>
  );
}
