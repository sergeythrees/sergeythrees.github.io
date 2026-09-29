import { Link } from 'react-router-dom';
import { App, Button, Card, Col, Row } from 'antd';
import { CopyOutlined, GithubOutlined, MailOutlined } from '@ant-design/icons';
import { profile } from '../data/site';
import PageHeader from '../components/PageHeader';

const githubHref =
  profile.links.find((link) => link.label.toLowerCase() === 'github')?.href ??
  'https://github.com/sergeythrees';

export default function ContactsPage() {
  // App.useApp() вместо статического message — так работают токены темы.
  const { message } = App.useApp();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      message.success('Почта скопирована');
    } catch {
      message.error('Не удалось скопировать — скопируйте адрес вручную');
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Связь"
        title="Контакты"
        subtitle="Открыт к задачам, вопросам по проектам и обсуждению сотрудничества."
      />

      <section className="section">
        <Row gutter={[16, 16]}>
          {profile.links.map((link) => (
            <Col key={link.href} xs={24} md={12}>
              <Card variant="borderless" className="contact-card">
                <div className="contact-card__label">{link.label}</div>
                <div className="contact-card__value">{link.value}</div>
                <div className="contact-card__actions">
                  {link.href.startsWith('mailto:') ? (
                    // mailto не открываем в новой вкладке: часть браузеров показывает пустую.
                    <Button type="primary" href={link.href} icon={<MailOutlined />}>
                      Написать
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      icon={<GithubOutlined />}
                    >
                      Открыть
                    </Button>
                  )}
                </div>
              </Card>
            </Col>
          ))}

          <Col xs={24} md={12}>
            <Card variant="borderless" className="contact-card">
              <div className="contact-card__label">Быстро</div>
              <div className="contact-card__value">
                Скопировать адрес, не переключаясь на почтовый клиент
              </div>
              <div className="contact-card__actions">
                <Button
                  icon={<CopyOutlined />}
                  onClick={() => {
                    void copyEmail();
                  }}
                >
                  Скопировать почту
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </section>

      <section className="section">
        <p className="section__paragraph">
          Больше кода и проектов — на{' '}
          <a href={githubHref} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          . Локальные проекты запускаются по инструкции со страницы проекта.
        </p>
        <Link to="/projects" className="section__link">
          Смотреть проекты
        </Link>
      </section>
    </>
  );
}
