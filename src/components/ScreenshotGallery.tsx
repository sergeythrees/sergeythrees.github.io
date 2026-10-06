import { Card, Col, Image, Row } from 'antd';
import type { Project } from '../data/types';
import { useT } from '../i18n/LocaleProvider';

interface ScreenshotGalleryProps {
  screenshots: Project['screenshots'];
  note?: string;
}

/** Путь из public/ с учётом base: '/'. */
export function assetUrl(src: string): string {
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) {
    return src;
  }
  return `${import.meta.env.BASE_URL}${src.replace(/^\.?\//, '')}`;
}

export default function ScreenshotGallery({ screenshots, note }: ScreenshotGalleryProps) {
  const t = useT();

  return (
    <section className="section">
      <h2 className="section__title">{t.common.screenshots}</h2>

      {screenshots.length === 0 ? (
        <div className="gallery-empty">{note ?? t.project.galleryEmpty}</div>
      ) : (
        <Image.PreviewGroup>
          <Row gutter={[16, 16]}>
            {screenshots.map((shot) => (
              <Col key={shot.src} xs={24} md={12}>
                <Card variant="borderless" className="shot-card">
                  <div className="shot-card__frame">
                    <Image
                      classNames={{ image: 'shot-card__image' }}
                      src={assetUrl(shot.src)}
                      alt={shot.caption}
                      loading="lazy"
                    />
                  </div>
                  <div className="shot-card__caption">{shot.caption}</div>
                </Card>
              </Col>
            ))}
          </Row>
        </Image.PreviewGroup>
      )}

      {screenshots.length > 0 && note ? <p className="gallery-note">{note}</p> : null}
    </section>
  );
}
