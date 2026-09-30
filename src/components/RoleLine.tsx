/**
 * Строка вида «Разработчик · Telegram Mini Apps · React»: переносится только
 * между частями, чтобы «Telegram Mini Apps» не разрывалось посередине.
 */
export default function RoleLine({ role }: { role: string }) {
  return (
    <>
      {role.split(' · ').map((part, index) => (
        <span key={part}>
          {index > 0 ? ' · ' : null}
          <span className="role-line__part">{part}</span>
        </span>
      ))}
    </>
  );
}
