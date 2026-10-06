import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App as AntApp, ConfigProvider } from 'antd';
import App from './App';
import { ThemeProvider, useThemeMode } from './theme/ThemeProvider';
import { LocaleProvider, useT } from './i18n/LocaleProvider';
import './styles/global.css';
import './styles/controls.css';
import './styles/employers.css';

const container = document.getElementById('root');
// Если #root нет, рендерить некуда — но сообщение всё равно должно быть локализованным,
// поэтому проверка живёт внутри провайдеров, а не на верхнем уровне модуля.
const mountNode = container ?? document.createElement('div');

function Root() {
  const t = useT();
  const { antdTheme } = useThemeMode();

  if (!container) {
    throw new Error(t.ui.notFoundRoot);
  }

  return (
    <ConfigProvider theme={antdTheme}>
      {/* AntApp нужен, чтобы App.useApp() отдавал message внутри страниц. */}
      <AntApp>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}

// Старые ссылки с решёткой (/#/employers/tasks/) переносим в путь: /employers/tasks/.
if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1));
}

createRoot(mountNode).render(
  <StrictMode>
    <ThemeProvider>
      <LocaleProvider>
        <Root />
      </LocaleProvider>
    </ThemeProvider>
  </StrictMode>,
);
