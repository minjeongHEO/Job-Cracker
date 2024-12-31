'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { getVaildTopics } from '@/app/_helpers/interviewHelpers';
import useTopicSelector from '@/app/_hooks/useTopicSelector';
import { useInterviewStore } from '@/app/_stores/useInterviewStore';
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
  const searchParams = useSearchParams();
  const { selectedTopics, isAllSelected, notSelected, isTopicSelected, handleClickTopic, handleSelectAll } =
    useTopicSelector({
      topics,
    });
  const { updateSelect, updateDevType } = useInterviewStore();

  const handleTopicNavigation = () => {
    const topicParam = isAllSelected ? 'all' : selectedTopics.join(',');
    router.push(`/interview/select/${devType}/prepare?topics=${topicParam}`);
  };

  const handleSubTopicNavigation = () => {
    const topicsFromUrl = searchParams.get('topics') || '';
    const wholeTopic = getVaildTopics(devType);
    const previousTopics = topicsFromUrl === 'all' ? wholeTopic : topicsFromUrl.split(',');

    updateDevType(devType);
    updateSelect({ topics: previousTopics, subTopics: selectedTopics });
    router.push('/interview/chat');
  };

  const navigateToNext = () => {
    if (!selectedTopics.length) return;

    switch (variant) {
      case 'topic':
        handleTopicNavigation();
        break;

      case 'subTopic':
        handleSubTopicNavigation();
        break;
    }
  };

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
