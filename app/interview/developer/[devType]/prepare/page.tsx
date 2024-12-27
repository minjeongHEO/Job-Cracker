'use client';
import { usePathname, useSearchParams } from 'next/navigation';

import TopicSelector from '@/app/_components/TopicSelector';
import { DeveloperType } from '@/app/_types/interview';
import { isDeveloperType } from '@/app/_utils/typeGuards';
import { DEVELOPER_OPTIONS } from '@/app/interview/_constants/developers';
import styles from '@/app/interview/developer/DeveloperPage.module.scss';

export default function PreparePage() {
  const pathname = usePathname(); //  `/interview/developer/FrontEnd/prepare`
  const searchParams = useSearchParams(); // ReadonlyURLSearchParams

  const isTopicByDevType = (devType: DeveloperType, topicsParam: string) => {
    if (topicsParam === 'all') return true;
    const validTopics = Object.keys(DEVELOPER_OPTIONS[devType].topics);
    return topicsParam.split(',').every((topic) => validTopics.includes(topic));
  };

  const devType = pathname.split('/')[3];
  if (!devType || !isDeveloperType(devType)) {
    return <div>Invalid developer type</div>;
  }

  const topicsParam = searchParams.get('topics');
  if (!topicsParam || !isTopicByDevType(devType, topicsParam)) {
    return <div>Invalid topic type</div>;
  }

  const selectedTopics =
    topicsParam === 'all' ? Object.keys(DEVELOPER_OPTIONS[devType].topics) : topicsParam.split(',');

  const subTopics = selectedTopics.flatMap((topic) => DEVELOPER_OPTIONS[devType].topics[topic] || []);

  return (
    <div className={styles.main}>
      <div className={styles['main__description']}>
        <div className={styles['main__title']}>세부 주제에 맞는 면접 질문을 준비해드릴게요!</div>
      </div>

      <div className={styles['main__selectBox']}>
        <TopicSelector devType={devType} topics={subTopics}></TopicSelector>
      </div>
    </div>
  );
}
