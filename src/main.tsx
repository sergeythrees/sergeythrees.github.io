import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App as AntApp, ConfigProvider } from 'antd';
import App from './App';
import { themeConfig } from './theme';
import './styles/global.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Не найден контейнер #root в index.html');
}

createRoot(container).render(
  <StrictMode>
    <ConfigProvider theme={themeConfig}>
      {/* AntApp нужен, чтобы App.useApp() отдавал message внутри страниц. */}
      <AntApp>
        <HashRouter>
          <App />
        </HashRouter>
      </AntApp>
    </ConfigProvider>
  </StrictMode>,
);
