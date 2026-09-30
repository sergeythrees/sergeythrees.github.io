import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'antd';
import { IdcardOutlined, MailOutlined } from '@ant-design/icons';
import { useLocale } from '../i18n/LocaleProvider';
import PageHeader from '../components/PageHeader';
import ProjectCard from '../components/ProjectCard';

export default function TasksPage() {
  const { content, t } = useLocale();

  return (
    <>
      <PageHeader title={t.tasks.title} subtitle={t.tasks.subtitle} />

      {/* Задания показываем той же карточкой, что и проекты: kind меняет бейдж и маршрут. */}
      <section className="section">
        <Row gutter={[20, 20]}>
          {content.tasks.map((task) => (
            <Col key={task.id} xs={24} md={12}>
              <ProjectCard project={task} kind="task" />
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
            <Button
              type="primary"
              href={`mailto:${content.site.email}`}
              icon={<MailOutlined />}
            >
              {content.employers.cta.contact}
            </Button>
            <Link to="/employers">
              <Button icon={<IdcardOutlined />}>{t.nav.employers}</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
