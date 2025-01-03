'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import SelectButton from '@/app/_components/atoms/SelectButton';
import { handleNavigation } from '@/app/_helpers/interviewHelpers';
import useTopicSelector from '@/app/_hooks/useTopicSelector';
import { DeveloperType, SelectorVariant } from '@/app/_types/interview';

import styles from './TopicSelector.module.scss';

export interface TopicSelectorProps {
  variant?: SelectorVariant;
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

  const handleNextClick = () => {
    const nextRoute = handleNavigation(variant, devType, selectedTopics, isAllSelected, searchParams);
    if (nextRoute) router.push(nextRoute);
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

      <button className={styles['next-button']} onClick={handleNextClick} disabled={notSelected}>
        다음
      </button>
    </>
  );
}
