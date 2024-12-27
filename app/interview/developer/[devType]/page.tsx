import TopicSelector from '@/app/_components/TopicSelector';
import { DeveloperType } from '@/app/_types/interview';
import { DEVELOPER_OPTIONS } from '@/app/interview/_constants/developers';

import styles from './devTypePage.module.scss';

export default async function DevTypePage({ params: { devType } }: { params: { devType: DeveloperType } }) {
  const selectedDevOptions = Object.keys(DEVELOPER_OPTIONS[devType].topics);

  if (!selectedDevOptions) {
    return <div>Invalid developer type</div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles['main__description']}>
        <div className={styles['main__title']}>어떤 주제로 {devType} 면접을 준비하시겠어요?</div>
      </div>

      <div className={styles['main__selectBox']}>
        <TopicSelector devType={devType} topics={selectedDevOptions}></TopicSelector>
      </div>
    </div>
  );
}
