'use client';

import clsx from 'clsx';

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
  const { selectedTopics, isAllSelected, handleClickTopic, selectAll, isSelectedTopic, navigateToNext } =
    useTopicSelector({
      variant,
      devType,
      topics,
    });

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
          onClick={selectAll}
        />
        {topics.map((topic) => (
          <SelectButton
            key={topic}
            variant="simple"
            option={{ title: topic }}
            isSelected={isSelectedTopic(topic)}
            onClick={() => handleClickTopic(topic)}
          />
        ))}
      </div>

      <button
        className={clsx(styles['next-button'], { [styles['next-button--visible']]: selectedTopics.length > 0 })}
        onClick={navigateToNext}
      >
        다음
      </button>
    </>
  );
}
