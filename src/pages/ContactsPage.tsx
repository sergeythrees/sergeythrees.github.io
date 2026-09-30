import { Link } from 'react-router-dom';
import { App, Button, Card, Col, Row } from 'antd';
import { CopyOutlined, GithubOutlined, MailOutlined } from '@ant-design/icons';
import { useLocale, useT } from '../i18n/LocaleProvider';
import PageHeader from '../components/PageHeader';

export default function ContactsPage() {
  const t = useT();
  const { content } = useLocale();
  const { site } = content;
  // App.useApp() вместо статического message — так работают токены темы.
  const { message } = App.useApp();

  const githubHref =
    site.links.find((link) => link.label.toLowerCase() === 'github')?.href ??
    'https://github.com/sergeythrees';

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      message.success(t.common.copyOk);
    } catch {
      message.error(t.common.copyFail);
    }
  };

  return (
    <>
      <PageHeader title={t.contacts.title} subtitle={t.contacts.subtitle} />

      <section className="section">
        <Row gutter={[16, 16]}>
          {site.links.map((link) => (
            <Col key={link.href} xs={24} md={12}>
              <Card variant="borderless" className="contact-card">
                <div className="contact-card__label">{link.label}</div>
                <div className="contact-card__value">{link.value}</div>
                <div className="contact-card__actions">
                  {link.href.startsWith('mailto:') ? (
                    <>
                      {/* mailto не открываем в новой вкладке: часть браузеров показывает пустую. */}
                      <Button type="primary" href={link.href} icon={<MailOutlined />}>
                        {t.common.write}
                      </Button>
                      <Button
                        icon={<CopyOutlined />}
                        onClick={() => {
                          void copyEmail();
                        }}
                      >
                        {t.common.copyEmail}
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="primary"
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      icon={<GithubOutlined />}
                    >
                      {t.common.open}
                    </Button>
                  )}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="section">
        <p className="section__paragraph">
          {t.contacts.more}{' '}
          <a href={githubHref} target="_blank" rel="noreferrer noopener">
            {t.common.github}
          </a>
          . {t.contacts.projectsHint}
        </p>
        <Link to="/projects" className="section__link">
          {t.contacts.seeProjects}
        </Link>
      </section>
    </>
  );
}
