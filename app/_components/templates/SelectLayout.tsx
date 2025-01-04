import { ReactNode } from 'react';

import styles from './SelectLayout.module.scss';

interface SelectLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function SelectLayout({ title, subtitle, children }: SelectLayoutProps) {
  return (
    <div className={styles.main}>
      {/* 제목, 부제목 */}
      {(title || subtitle) && (
        <div className={styles['main__description']}>
          {title && <h1 className={styles['main__title']}>{title}</h1>}
          {subtitle && <p className={styles['main__sub-title']}>{subtitle}</p>}
        </div>
      )}

      {/* 선택 박스 */}
      <div className={styles['main__selectBox']}>{children}</div>
    </div>
  );
}
