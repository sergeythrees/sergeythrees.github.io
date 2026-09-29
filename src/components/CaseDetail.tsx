import { Link } from 'react-router-dom';
import { Button, Col, Row, Tooltip } from 'antd';
import { ArrowLeftOutlined, ExportOutlined } from '@ant-design/icons';
import type { Project } from '../data/types';
import type { Dictionary } from '../i18n/dictionary/ru';
import PageHeader from './PageHeader';
import StackTags from './StackTags';
import ScreenshotGallery, { assetUrl } from './ScreenshotGallery';

interface CaseDetailProps {
  project: Project;
  /** База для ссылок «Назад» и prev/next: /projects или /employers/tasks. */
  backTo: string;
  backLabel: string;
  /** Соседние записи того же раздела — из них берутся prev/next. */
  prevNext: Project[];
  t: Dictionary;
  /** Подпись основной кнопки: у проектов «Открыть приложение», у заданий — стенд. */
  openLabel?: string;
}

/**
 * Общая разметка детальной страницы проекта и тестового задания:
 * один вид для обоих разделов, отличается только база ссылок.
 */
export default function CaseDetail({
  project,
  backTo,
  backLabel,
  prevNext,
  t,
  openLabel,
}: CaseDetailProps) {
  const index = prevNext.findIndex((item) => item.id === project.id);
  const showNav = prevNext.length > 1 && index >= 0;
  const prev = showNav ? prevNext[(index - 1 + prevNext.length) % prevNext.length] : undefined;
  const next = showNav ? prevNext[(index + 1) % prevNext.length] : undefined;

  return (
    <>
      <Link to={backTo} className="back-link">
        <Button type="text" size="small" icon={<ArrowLeftOutlined />}>
          {backLabel}
        </Button>
      </Link>

      <PageHeader
        eyebrow={project.badge ?? project.status}
        title={project.name}
        subtitle={project.tagline}
        actions={
          <div className="detail-actions">
            {project.appUrl ? (
              <Button
                type="primary"
                size="large"
                icon={<ExportOutlined />}
                href={assetUrl(project.appUrl)}
                target="_blank"
                rel="noreferrer noopener"
              >
                {openLabel ?? t.project.openApp}
              </Button>
            ) : (
              <Tooltip title={project.runNote ?? t.project.localOnly}>
                <span className="tooltip-target">
                  <Button size="large" disabled>
                    {t.project.localOnly}
                  </Button>
                </span>
              </Tooltip>
            )}

            {project.links.map((link) => (
              <div key={link.href} className="detail-actions__item">
                <Button
                  href={assetUrl(link.href)}
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
              <p className="detail-actions__note">{t.project.localOnlyNote}</p>
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
        <h2 className="section__title">{t.common.stack}</h2>
        <StackTags items={project.stack} />
      </section>

      <section className="section">
        <h2 className="section__title">{t.common.features}</h2>
        <ul className="feature-list">
          {project.features.map((feature) => (
            <li key={feature} className="feature-list__item">
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 className="section__title">{t.common.detailsTitle}</h2>
        <p className="section__lead">{project.summary}</p>
        {project.details.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="section__paragraph">
            {paragraph}
          </p>
        ))}
      </section>

      {project.runCommands?.length ? (
        <section className="section">
          <h2 className="section__title">{t.common.runTitle}</h2>
          {project.runNote ? <p className="section__lead">{project.runNote}</p> : null}
          <pre className="run-commands">{project.runCommands.join('\n')}</pre>
        </section>
      ) : null}

      <ScreenshotGallery screenshots={project.screenshots} />

      {showNav && prev && next ? (
        <section className="section">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Link to={`${backTo}/${prev.id}`} className="project-nav">
                <span className="project-nav__label">{t.project.prev}</span>
                <span className="project-nav__name">{prev.name}</span>
                <span className="project-nav__tagline">{prev.tagline}</span>
              </Link>
            </Col>
            <Col xs={24} md={12}>
              <Link to={`${backTo}/${next.id}`} className="project-nav project-nav--next">
                <span className="project-nav__label">{t.project.next}</span>
                <span className="project-nav__name">{next.name}</span>
                <span className="project-nav__tagline">{next.tagline}</span>
              </Link>
            </Col>
          </Row>
        </section>
      ) : null}
    </>
  );
}
