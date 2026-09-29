import { Space, Tag } from 'antd';

interface StackTagsProps {
  items: string[];
  /** Сколько тегов не поместилось — покажем как «+N». */
  extra?: number;
}

export default function StackTags({ items, extra = 0 }: StackTagsProps) {
  return (
    <Space className="stack-tags" size={[6, 6]} wrap>
      {items.map((item) => (
        <Tag key={item} className="stack-tags__tag">
          {item}
        </Tag>
      ))}
      {extra > 0 ? <Tag className="stack-tags__tag stack-tags__tag--more">+{extra}</Tag> : null}
    </Space>
  );
}
