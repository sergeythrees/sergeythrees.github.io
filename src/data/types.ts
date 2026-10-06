export type Locale = 'ru' | 'en';

export type ProjectStatusType = 'success' | 'processing' | 'default' | 'warning';

export interface ProjectLink {
  label: string;
  href: string;
  /** Подсказка при наведении на кнопку, чтобы было понятно, куда ведёт ссылка. */
  hint?: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface Screenshot {
  src: string;
  caption: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  status: string;
  statusType: ProjectStatusType;
  facts: Fact[];
  features: string[];
  stack: string[];
  links: ProjectLink[];
  /** Основная кнопка «Открыть приложение». Пусто — приложение только локальное. */
  appUrl?: string;
  runNote?: string;
  runCommands?: string[];
  details: string[];
  screenshots: Screenshot[];
  /** Метка над названием: «Тестовое задание», «Личный проект» и т.п. */
  badge?: string;
}

export interface SocialLink {
  label: string;
  value: string;
  href: string;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface Profile {
  name: string;
  handle: string;
  role: string;
  /** Крупная фраза под именем на главной. */
  headline: string;
  intro: string;
  email: string;
  location: string;
  links: SocialLink[];
  skills: SkillGroup[];
  /** Короткий текст о подходе к работе — блок «Принципы». */
  principles: string[];
  /** Блок «Обо мне»: 2-3 абзаца. */
  about: string[];
}

export interface EmployersContent {
  title: string;
  subtitle: string;
  highlights: { title: string; text: string }[];
  /** Подпись кнопки «Написать» в блоке связи. */
  cta: { contact: string };
}

/** Локализованный контент сайта целиком. */
export interface Content {
  site: Profile;
  projects: Project[];
  tasks: Project[];
  employers: EmployersContent;
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  field: string;
  period: string;
  grade: string;
}

export interface ResumeExperience {
  position: string;
  company: string;
  period: string;
  location: string;
  industry: string;
  description: string;
  achievements: string[];
}

export interface ResumeSkillGroup {
  group: string;
  items: string[];
}

export interface Resume {
  name: string;
  title: string;
  summary: string;
  contacts: { label: string; value: string; href?: string }[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: ResumeSkillGroup[];
  languages: { language: string; level: string }[];
  projects: { name: string; description: string }[];
  preferences: { label: string; value: string }[];
  /** Ссылка на PDF-версию (файл в public/resume). */
  pdf?: string;
}
