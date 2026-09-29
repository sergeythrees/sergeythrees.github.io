import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'antd';
import { AppstoreOutlined, GithubOutlined, MailOutlined } from '@ant-design/icons';
import { profile } from '../data/site';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import StackTags from '../components/StackTags';

const githubHref =
  profile.links.find((link) => link.label.toLowerCase() === 'github')?.href ??
  'https://github.com/sergeythrees';

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <span className="hero__badge">Портфолио · GitHub</span>
        <h1 className="hero__name">{profile.name}</h1>
        <div className="hero__role">{profile.role}</div>
        <p className="hero__tagline">{profile.tagline}</p>
        <p className="hero__intro">{profile.intro}</p>

        <div className="hero__actions">
          <Link to="/projects">
            <Button type="primary" size="large" icon={<AppstoreOutlined />}>
              Смотреть проекты
            </Button>
          </Link>
          <Link to="/about">
            <Button size="large">Обо мне</Button>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2 className="section__title">Проекты</h2>
          <Link to="/projects" className="section__link">
            Все проекты
          </Link>
        </div>

        <Row gutter={[20, 20]}>
          {projects.map((project) => (
            <Col key={project.id} xs={24} sm={12} xl={8}>
              <ProjectCard project={project} />
            </Col>
          ))}
        </Row>
      </section>

      <section className="section">
        <h2 className="section__title">Стек</h2>

        <Row gutter={[24, 24]}>
          {profile.skills.map((skill) => (
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
          <div className="cta__title">Есть задача или вопрос?</div>
          <div className="cta__subtitle">
            Напишите на {profile.email} — отвечу и расскажу, чем могу помочь.
          </div>
        </div>
        <div className="cta__actions">
          <Button type="primary" size="large" href={`mailto:${profile.email}`} icon={<MailOutlined />}>
            Написать
          </Button>
          <Button
            size="large"
            href={githubHref}
            target="_blank"
            rel="noreferrer noopener"
            icon={<GithubOutlined />}
          >
            GitHub
          </Button>
        </div>
      </section>
    </>
  );
}
