import { Link, useParams } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useLocale, useT } from '../i18n/LocaleProvider';
import CaseDetail from '../components/CaseDetail';

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const t = useT();
  const { content } = useLocale();
  const tasks = content.tasks;
  const task = tasks.find((item) => item.id === id);

  // Неизвестный id — та же заглушка, что у проектов, но возврат в раздел заданий.
  if (!task) {
    return (
      <div className="empty-state">
        <div className="empty-state__code">404</div>
        <h1 className="empty-state__title">{t.project.notFound}</h1>
        <p className="empty-state__text">{t.project.notFoundText}</p>
        <Link to="/employers/tasks">
          <Button type="primary" icon={<ArrowLeftOutlined />}>
            {t.nav.tasks}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <CaseDetail
      project={task}
      backTo="/employers/tasks"
      backLabel={t.nav.tasks}
      prevNext={tasks}
      t={t}
    />
  );
}
