import { Col, Row } from 'antd';
import { projects } from '../data/projects';
import PageHeader from '../components/PageHeader';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Портфолио"
        title="Проекты"
        subtitle={`Всего проектов: ${projects.length}. React-библиотеки, Telegram Mini Apps, ИИ-боты и браузерные агенты — с исходным кодом, тестами и понятным запуском.`}
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
