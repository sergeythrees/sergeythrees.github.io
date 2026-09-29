import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useT } from '../i18n/LocaleProvider';

export default function NotFoundPage() {
  const t = useT();

  return (
    <div className="empty-state">
      <div className="empty-state__code">404</div>
      <h1 className="empty-state__title">{t.notFound.title}</h1>
      <p className="empty-state__text">{t.notFound.text}</p>
      <Link to="/">
        <Button type="primary" icon={<HomeOutlined />}>
          {t.notFound.cta}
        </Button>
      </Link>
    </div>
  );
}
