import { Col, Row } from 'antd';
import { useLocale, useT } from '../i18n/LocaleProvider';
import PageHeader from '../components/PageHeader';
import StackTags from '../components/StackTags';
import { assetUrl } from '../components/ScreenshotGallery';

export default function AboutPage() {
  const t = useT();
  const { content } = useLocale();
  const { site } = content;

  return (
    <>
      <PageHeader eyebrow={t.about.eyebrow} title={t.about.title} subtitle={site.role} />

      <section className="section">
        <Row gutter={[32, 32]} align="top">
          <Col xs={24} sm={8} md={6}>
            <figure className="about-photo">
              <img
                className="about-photo__img"
                src={assetUrl('photo.jpg')}
                alt={site.name}
                width={199}
                height={199}
                loading="lazy"
              />
            </figure>
          </Col>
          <Col xs={24} sm={16} md={18}>
            {site.about.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="section__paragraph">
                {paragraph}
              </p>
            ))}
          </Col>
        </Row>
      </section>

      <section className="section">
        <h2 className="section__title">{t.about.skillsTitle}</h2>
        <Row gutter={[24, 24]}>
          {site.skills.map((skill) => (
            <Col key={skill.group} xs={24} sm={12}>
              <div className="skill-group">
                <div className="skill-group__title">{skill.group}</div>
                <StackTags items={skill.items} />
              </div>
            </Col>
          ))}
        </Row>
      </section>

      <section className="section">
        <h2 className="section__title">{t.about.principlesTitle}</h2>
        <ul className="feature-list">
          {site.principles.map((principle) => (
            <li key={principle} className="feature-list__item">
              {principle}
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 className="section__title">{t.nav.contacts}</h2>
        <p className="section__paragraph">
          {t.common.email}: {site.email} · {site.location}
        </p>
      </section>
    </>
  );
}
