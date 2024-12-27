import { DeveloperType } from '@/app/_types/interview';
import { DEVELOPER_OPTIONS } from '@/app/interview/_constants/developers';

import styles from './devTypePage.module.scss';

export default async function DevTypePage({ params: { devType } }: { params: { devType: DeveloperType } }) {
  const selectedDevOptions = DEVELOPER_OPTIONS[devType];

  if (!selectedDevOptions) {
    return <div>Invalid developer type</div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles['main__description']}>
        <div className={styles['main__title']}>어떤 주제로 {selectedDevOptions.title} 면접을 준비하시겠어요?</div>
      </div>

      <div className={styles['main__selectBox']}>{/* TODO 선택하는 클라 컴포넌트 */}</div>
    </div>
  );
}
