import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

export default function NotFoundPage() {
  return (
    <div className="empty-state">
      <div className="empty-state__code">404</div>
      <h1 className="empty-state__title">Страница не найдена</h1>
      <p className="empty-state__text">
        Такого адреса нет. Проверьте ссылку или вернитесь на главную.
      </p>
      <Link to="/">
        <Button type="primary" icon={<HomeOutlined />}>
          На главную
        </Button>
      </Link>
    </div>
  );
}
