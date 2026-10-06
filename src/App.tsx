import { Suspense, lazy, useLayoutEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';

// Остальные страницы грузим отдельными чанками: на главную попадает только нужный код.
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const EmployersPage = lazy(() => import('./pages/EmployersPage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));
const TasksPage = lazy(() => import('./pages/TasksPage'));
const TaskDetailPage = lazy(() => import('./pages/TaskDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/** Роутер сам не сбрасывает прокрутку: без этого новая страница открывается там, где закончилась старая. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AppLayout>
      <ScrollToTop />
      <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/employers" element={<EmployersPage />} />
          <Route path="/employers/resume" element={<ResumePage />} />
          <Route path="/employers/tasks" element={<TasksPage />} />
          <Route path="/employers/tasks/:id" element={<TaskDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
}
