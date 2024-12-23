import SelectButton from '@/app/_components/SelectButton';

import styles from './DeveloperPage.module.scss';

export default function DeveloperPage() {
  return (
    <div className={styles.main}>
      <div className={styles['main__description']}>
        <div className={styles['main__title']}>당신은 어떤 개발자인가요?</div>
        <div className={styles['main__sub-title']}>관심 있는 개발 분야를 선택해주세요.</div>
      </div>

      <div className={styles['main__selectBox']}>
        <SelectButton />
        <SelectButton />
        <SelectButton />
      </div>
    </div>
  );
}
