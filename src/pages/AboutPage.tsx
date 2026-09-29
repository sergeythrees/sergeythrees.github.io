import { Col, Row } from 'antd';
import { profile } from '../data/site';
import PageHeader from '../components/PageHeader';
import StackTags from '../components/StackTags';

/** Принципы работы — мнение автора сайта, без выдуманных фактов и дат. */
const PRINCIPLES = [
  'Работающий код вместо демо: каждый проект можно запустить и проверить.',
  'Тесты как часть проекта, а не отдельная задача «на потом».',
  'Понятный запуск в одну команду и честная инструкция, если так не получилось.',
  'Минимум зависимостей и инфраструктуры — только то, что реально нужно задаче.',
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="Обо мне" title="Обо мне" subtitle={profile.role} />

      <section className="section">
        <p className="section__paragraph">{profile.intro}</p>
        <p className="section__paragraph">
          Мне интересны задачи, где нужно собрать продукт целиком: интерфейс, серверную часть и
          автоматизацию вокруг. Обычно начинаю с того, что формулирую проверяемый результат, а
          затем собираю минимальную работающую версию и наращиваю её.
        </p>
        <p className="section__paragraph">
          Отдельное внимание — запуску и поддержке: если проект нельзя поднять по инструкции из
          README, он считается незаконченным. Поэтому в каждом проекте есть команды запуска,
          тесты и описание того, что уже работает, а что ещё в процессе.
        </p>
      </section>

      <section className="section">
        <h2 className="section__title">Стек</h2>
        <Row gutter={[24, 24]}>
          {profile.skills.map((skill) => (
            <Col key={skill.group} xs={24} sm={12}>
              <div className="skill-group">
                <div className="skill-group__title">{skill.group}</div>
                <StackTags items={skill.items} />
              </div>
            </Col>
          ))}
        </Row>
      </section>

      <section className="section">
        <h2 className="section__title">Принципы</h2>
        <ul className="feature-list">
          {PRINCIPLES.map((principle) => (
            <li key={principle} className="feature-list__item">
              {principle}
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 className="section__title">Контакты</h2>
        <p className="section__paragraph">
          Почта: {profile.email}. {profile.location}.
        </p>
      </section>
    </>
  );
}
