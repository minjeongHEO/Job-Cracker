'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { getTopicParam, getVaildTopics } from '@/app/_helpers/interviewHelpers';
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
  const searchParams = useSearchParams();
  const { selectedTopics, isAllSelected, notSelected, isTopicSelected, handleClickTopic, handleSelectAll } =
    useTopicSelector({
      topics,
    });

  const getParamsForChat = () => {
    const subTopicParam = getTopicParam(isAllSelected, selectedTopics);
    const topicsParam =
      searchParams.get('topics') === 'all' ? getVaildTopics(devType).join(',') : searchParams.get('topics');
    const params = new URLSearchParams({
      devType,
      topics: topicsParam || '',
      subTopics: subTopicParam,
    });

    return params;
  };

  const getParamsForSubTopic = () => {
    const topicsParam = getTopicParam(isAllSelected, selectedTopics);
    const params = new URLSearchParams({
      topics: topicsParam,
    });

    return params;
  };

  const handleNavigation = () => {
    if (!selectedTopics.length) return;

    switch (variant) {
      case 'topic':
        router.push(`/interview/select/${devType}/prepare?${getParamsForSubTopic()}`);
        break;

      case 'subTopic':
        router.push(`/interview/chat?${getParamsForChat()}`);
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

      <button className={styles['next-button']} onClick={handleNavigation} disabled={notSelected}>
        다음
      </button>
    </>
  );
}
