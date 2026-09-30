import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'antd';
import { ExperimentOutlined, FileTextOutlined, GithubOutlined, MailOutlined } from '@ant-design/icons';
import { useLocale } from '../i18n/LocaleProvider';
import PageHeader from '../components/PageHeader';

export default function EmployersPage() {
  const { content, t } = useLocale();
  const { employers } = content;
  const githubHref =
    content.site.links.find((link) => link.label.toLowerCase() === 'github')?.href ??
    'https://github.com/sergeythrees';

  return (
    <>
      <PageHeader title={employers.title} subtitle={employers.subtitle} />

      {/* Две крупные ссылки-карточки: резюме и тестовые задания. */}
      <section className="section">
        <Row gutter={[20, 20]}>
          <Col xs={24} md={12}>
            <Link to="/employers/resume" className="employers-card">
              <span className="employers-card__icon" aria-hidden="true">
                <FileTextOutlined />
              </span>
              <span className="employers-card__title">{t.employers.resumeTitle}</span>
              <span className="employers-card__text">{t.employers.resumeText}</span>
              <span className="employers-card__more">{t.common.details} →</span>
            </Link>
          </Col>
          <Col xs={24} md={12}>
            <Link to="/employers/tasks" className="employers-card">
              <span className="employers-card__icon" aria-hidden="true">
                <ExperimentOutlined />
              </span>
              <span className="employers-card__title">{t.employers.tasksTitle}</span>
              <span className="employers-card__text">{t.employers.tasksText}</span>
              <span className="employers-card__more">{t.common.details} →</span>
            </Link>
          </Col>
        </Row>
      </section>

      <section className="section">
        <h2 className="section__title">{t.employers.highlightsTitle}</h2>
        <Row gutter={[16, 16]}>
          {employers.highlights.map((item) => (
            <Col key={item.title} xs={24} md={8}>
              <div className="employer-highlight">
                <h3 className="employer-highlight__title">{item.title}</h3>
                <p className="employer-highlight__text">{item.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </section>

      <section className="section">
        <div className="cta">
          <div>
            <div className="cta__title">{t.home.ctaTitle}</div>
            <div className="cta__subtitle">{t.home.ctaText}</div>
          </div>
          <div className="cta__actions">
            <Button type="primary" href={`mailto:${content.site.email}`} icon={<MailOutlined />}>
              {employers.cta.contact}
            </Button>
            <Button
              href={githubHref}
              target="_blank"
              rel="noreferrer noopener"
              icon={<GithubOutlined />}
            >
              {t.common.github}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
