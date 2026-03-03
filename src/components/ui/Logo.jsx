import { useState } from 'react';
import './Logo.css';

/**
 * Лого Novacode VLC.
 * Пробует PNG-изображение; при ошибке загрузки показывает текстовый fallback.
 */
export function Logo({ className = '', height = 36 }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <span className={`logo logo--text ${className}`} aria-label="Novacode VLC">
        Novacode VLC
      </span>
    );
  }

  return (
    <img
      src="/novacode_light.svg"
      alt="Novacode VLC"
      className={`logo ${className}`}
      style={{ maxHeight: `${height}px`, width: 'auto' }}
      onError={() => setImgError(true)}
    />
  );
}
