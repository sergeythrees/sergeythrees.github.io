import { Link } from 'react-router-dom';
import { Button, Col, Row, Tooltip } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined } from '@ant-design/icons';
import { useLocale } from '../i18n/LocaleProvider';
import { resumeEn, resumeRu } from '../data/resume';
import { assetUrl } from '../components/ScreenshotGallery';
import StackTags from '../components/StackTags';

export default function ResumePage() {
  const { locale, t } = useLocale();
  const resume = locale === 'en' ? resumeEn : resumeRu;

  return (
    // .resume-sheet нужен печати: при Ctrl+P остаётся только само резюме.
    <div className="resume-sheet">
      <Link to="/employers" className="back-link no-print">
        <Button type="text" size="small" icon={<ArrowLeftOutlined />}>
          {t.nav.employers}
        </Button>
      </Link>

      <header className="resume-head">
        <div className="resume-head__main">
          <h1 className="resume-head__name">{resume.name}</h1>
          <div className="resume-head__title">{resume.title}</div>
          <p className="resume-head__summary">{resume.summary}</p>
        </div>

        <aside className="resume-head__side">
          <div className="resume-head__contacts-title">{t.resume.contacts}</div>
          <ul className="resume-contacts">
            {resume.contacts.map((contact) => (
              <li key={contact.label} className="resume-contact">
                <span className="resume-contact__label">{contact.label}</span>
                {contact.href ? (
                  <a
                    className="resume-contact__value"
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer noopener"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <span className="resume-contact__value">{contact.value}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="resume-head__actions no-print">
            {resume.pdf ? (
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                href={assetUrl(resume.pdf)}
                target="_blank"
                rel="noreferrer noopener"
                download
              >
                {t.resume.download}
              </Button>
            ) : (
              <Tooltip title={t.resume.noPdf}>
                <span className="tooltip-target">
                  <Button disabled icon={<DownloadOutlined />}>
                    {t.resume.download}
                  </Button>
                </span>
              </Tooltip>
            )}
          </div>
        </aside>
      </header>

      <Row gutter={[20, 20]}>
        <Col xs={24} lg={16}>
          <section className="section">
            <h2 className="section__title">{t.resume.experience}</h2>
            <div className="resume-timeline">
              {resume.experience.map((job) => (
                <article key={`${job.company}-${job.period}`} className="resume-timeline__item">
                  <h3 className="resume-timeline__position">{job.position}</h3>
                  <div className="resume-timeline__company">{job.company}</div>
                  <div className="resume-timeline__period">{job.period}</div>
                  <div className="resume-timeline__meta">
                    {job.location} · {job.industry}
                  </div>
                  <p className="resume-timeline__description">{job.description}</p>

                  {job.achievements.length > 0 ? (
                    <>
                      <div className="resume-timeline__subtitle">{t.resume.achievements}</div>
                      <ul className="resume-achievements">
                        {job.achievements.map((achievement) => (
                          <li key={achievement} className="resume-achievements__item">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          <section className="section">
            <h2 className="section__title">{t.resume.projects}</h2>
            <ul className="resume-projects">
              {resume.projects.map((project) => (
                <li key={project.name} className="resume-projects__item">
                  <div className="resume-projects__name">{project.name}</div>
                  <p className="resume-projects__text">{project.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="section">
            <h2 className="section__title">{t.resume.education}</h2>
            {resume.education.map((item) => (
              <article key={`${item.institution}-${item.period}`} className="resume-edu">
                <div className="resume-edu__head">
                  <h3 className="resume-edu__degree">{item.degree}</h3>
                  <span className="resume-edu__period">{item.period}</span>
                </div>
                <div className="resume-edu__institution">
                  {item.institution} · {item.field}
                </div>
                <div className="resume-edu__grade">{item.grade}</div>
              </article>
            ))}
          </section>
        </Col>

        <Col xs={24} lg={8}>
          <aside className="resume-panel">
            <h2 className="section__title">{t.resume.skills}</h2>
            {resume.skills.map((group) => (
              <div key={group.group} className="resume-skill-group">
                <h3 className="resume-skill-group__title">{group.group}</h3>
                <StackTags items={group.items} />
              </div>
            ))}
          </aside>

          <aside className="resume-panel">
            <h2 className="section__title">{t.resume.languages}</h2>
            <ul className="resume-langs">
              {resume.languages.map((item) => (
                <li key={item.language} className="resume-langs__item">
                  <span className="resume-langs__name">{item.language}</span>
                  <span className="resume-langs__level">{item.level}</span>
                </li>
              ))}
            </ul>
          </aside>

          <aside className="resume-panel">
            <h2 className="section__title">{t.resume.preferences}</h2>
            <ul className="resume-prefs">
              {resume.preferences.map((item) => (
                <li key={item.label} className="resume-prefs__item">
                  <span className="resume-prefs__label">{item.label}</span>
                  <span className="resume-prefs__value">{item.value}</span>
                </li>
              ))}
            </ul>
          </aside>
        </Col>
      </Row>
    </div>
  );
}
