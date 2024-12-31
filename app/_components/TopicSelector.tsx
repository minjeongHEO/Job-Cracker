'use client';

import { useRouter } from 'next/navigation';

import useTopicSelector from '@/app/_hooks/useTopicSelector';
import { DeveloperType } from '@/app/_types/interview';

import SelectButton from './SelectButton';
import styles from './TopicSelector.module.scss';

export interface TopicSelectorProps {
  variant?: 'topic' | 'subTopic';
  devType: DeveloperType;
  topics: string[];
}

export default function TopicSelector({ variant = 'topic', devType, topics }: TopicSelectorProps) {
  const router = useRouter();
  const { selectedTopics, isAllSelected, isTopicSelected, handleClickTopic, handleSelectAll } = useTopicSelector({
    topics,
  });

  const navigateToNext = () => {
    if (!selectedTopics.length) return;
    switch (variant) {
      case 'topic':
        const topicParam = isAllSelected ? 'all' : selectedTopics.join(',');
        router.push(`/interview/select/${devType}/prepare?topics=${topicParam}`);
        break;
      case 'subTopic':
        router.push('/interview/chat');
        break;
    }
  };

  const notSelected = selectedTopics.length === 0;

  return (
    <>
      <div className={styles['sub_title']}>
        원하는 주제를 선택해주세요.
        <span>
          {selectedTopics.length}/{topics.length}
        </span>
      </div>

      <div className={styles['select_container']}>
        <SelectButton
          key={`topic-all`}
          variant="simple"
          option={{ title: '전체 선택' }}
          isSelected={isAllSelected}
          onClick={handleSelectAll}
        />
        {topics.map((topic) => (
          <SelectButton
            key={topic}
            variant="simple"
            option={{ title: topic }}
            isSelected={isTopicSelected(topic)}
            onClick={() => handleClickTopic(topic)}
          />
        ))}
      </div>

      <button className={styles['next-button']} onClick={navigateToNext} disabled={notSelected}>
        다음
      </button>
    </>
  );
}
