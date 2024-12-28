'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { DeveloperType } from '@/app/_types/interview';

import SelectButton from './SelectButton';
import styles from './TopicSelector.module.scss';

interface TopicSelectorProps {
  variant?: 'topic' | 'subTopic';
  devType: DeveloperType;
  topics: string[];
}

export default function TopicSelector({ variant = 'topic', devType, topics }: TopicSelectorProps) {
  const router = useRouter();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const isAllSelected = selectedTopics.length === topics.length;

  const navigateToNext = () => {
    if (!selectedTopics.length) return;

    switch (variant) {
      case 'topic':
        const topicParam = isAllSelected ? `all` : selectedTopics.join(',');
        router.push(`/interview/select/${devType}/prepare?topics=${topicParam}`);
        break;
      case 'subTopic':
        router.push(`/interview/chat`);
        break;
    }
  };

  const toggleTopic = (prevTopics: string[], clickedTopic: string) => {
    if (prevTopics.includes(clickedTopic)) {
      const newSelectedTopics = prevTopics.filter((topic) => topic !== clickedTopic);
      return newSelectedTopics;
    }
    return [...prevTopics, clickedTopic];
  };

  const handleClickTopic = (clickedTopic: string) => {
    setSelectedTopics((prevTopics) => toggleTopic(prevTopics, clickedTopic));
  };

  const selectAll = () => {
    setSelectedTopics((prevSelectedTopics) => {
      if (prevSelectedTopics.length === topics.length) return [];
      return topics;
    });
  };

  const isSelectedTopic = (topic: string) => selectedTopics.includes(topic);

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
