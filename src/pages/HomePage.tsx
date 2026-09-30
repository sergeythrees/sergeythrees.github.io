import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'antd';
import { AppstoreOutlined, GithubOutlined, MailOutlined } from '@ant-design/icons';
import { useLocale, useT } from '../i18n/LocaleProvider';
import ProjectCard from '../components/ProjectCard';
import StackTags from '../components/StackTags';
import RoleLine from '../components/RoleLine';
import { assetUrl } from '../components/ScreenshotGallery';

export default function HomePage() {
  const t = useT();
  const { content } = useLocale();
  const { site, projects } = content;

  const githubHref =
    site.links.find((link) => link.label.toLowerCase() === 'github')?.href ??
    'https://github.com/sergeythrees';

  return (
    <>
      <section className="hero">
        <Row gutter={[32, 32]} align="top">
          <Col xs={24} sm={8} md={4}>
            <figure className="about-photo">
              <img
                className="about-photo__img"
                src={assetUrl('photo.jpg')}
                alt={site.name}
                width={199}
                height={199}
              />
            </figure>
          </Col>
          <Col xs={24} sm={16} md={20}>
            <h1 className="hero__name">{site.name}</h1>
            <div className="hero__role">
              <RoleLine role={site.role} />
            </div>
          </Col>
        </Row>

        <p className="hero__tagline">{site.headline}</p>

        <p className="hero__intro">{site.intro}</p>

        <div className="hero__actions">
          <Link to="/projects">
            <Button type="primary" size="large" icon={<AppstoreOutlined />}>
              {t.home.ctaProjects}
            </Button>
          </Link>
          <Link to="/about">
            <Button size="large">{t.home.ctaAbout}</Button>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">{t.home.projectsTitle}</h2>
          <Link to="/projects" className="section__link">
            {t.home.projectsAll}
          </Link>
        </div>

        <Row gutter={[20, 20]}>
          {projects.map((project) => (
            <Col key={project.id} xs={24} md={12}>
              <ProjectCard project={project} />
            </Col>
          ))}
        </Row>
      </section>

      <section className="section">
        <h2 className="section__title">{t.home.stackTitle}</h2>

        <Row gutter={[24, 24]}>
          {site.skills.map((skill) => (
            <Col key={skill.group} xs={24} sm={12} xl={6}>
              <div className="skill-group">
                <div className="skill-group__title">{skill.group}</div>
                <StackTags items={skill.items} />
              </div>
            </Col>
          ))}
        </Row>
      </section>

      <section className="cta">
        <div className="cta__text">
          <div className="cta__title">{t.home.ctaTitle}</div>
          <div className="cta__subtitle">{t.home.ctaText}</div>
        </div>
        <div className="cta__actions">
          <Button type="primary" size="large" href={`mailto:${site.email}`} icon={<MailOutlined />}>
            {t.common.write}
          </Button>
          <Button
            size="large"
            href={githubHref}
            target="_blank"
            rel="noreferrer noopener"
            icon={<GithubOutlined />}
          >
            {t.common.github}
          </Button>
        </div>
      </section>
    </>
  );
}
