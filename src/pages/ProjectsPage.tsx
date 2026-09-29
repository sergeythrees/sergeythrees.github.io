import { Col, Row } from 'antd';
import { useLocale, useT } from '../i18n/LocaleProvider';
import PageHeader from '../components/PageHeader';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  const t = useT();
  const { content } = useLocale();
  const { projects } = content;

  return (
    <>
      <PageHeader
        eyebrow={t.projects.eyebrow}
        title={t.projects.title}
        subtitle={t.projects.subtitle}
      />

      <Row gutter={[20, 20]}>
        {projects.map((project) => (
          <Col key={project.id} xs={24} sm={12} xl={8}>
            <ProjectCard project={project} />
          </Col>
        ))}
      </Row>
    </>
  );
}
