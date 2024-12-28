import styles from './SelectLayout.module.scss';

interface InterviewLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function SelectLayout({ title, subtitle, children }: InterviewLayoutProps) {
  return (
    <div className={styles.main}>
      {/* 제목, 부제목 */}
      <div className={styles['main__description']}>
        <div className={styles['main__title']}>{title}</div>
        {subtitle && <div className={styles['main__sub-title']}>{subtitle}</div>}
      </div>

      {/* 선택 박스 */}
      <div className={styles['main__selectBox']}>{children}</div>
    </div>
  );
}
