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

  const handleNext = () => {
    if (!selectedTopics.length) return;

    switch (variant) {
      case 'topic':
        const topicParam = selectedTopics.length === topics.length ? `all` : selectedTopics.join(',');
        router.push(`/interview/select/${devType}/prepare?topics=${topicParam}`);
        break;
      case 'subTopic':
        router.push(`/interview/chat`);
        break;
    }
  };

  const handleClickTopic = (clickedTopic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(clickedTopic) ? prev.filter((topic) => topic !== clickedTopic) : [...prev, clickedTopic]
    );
  };

  const selectAll = () => {
    setSelectedTopics((prev) => (prev.length === topics.length ? [] : topics));
  };

  return (
    <>
      <div className={styles['sub_title']}>
        원하는 주제를 선택해주세요.
        <span>
          {selectedTopics.length}/{topics.length}
        </span>
      </div>

      <SelectButton
        key={`topic-all`}
        variant="simple"
        option={{ title: '전체 선택' }}
        isSelected={selectedTopics.length === topics.length}
        onClick={selectAll}
      />
      {topics.map((topic) => (
        <SelectButton
          key={topic}
          variant="simple"
          option={{ title: topic }}
          isSelected={selectedTopics.includes(topic)}
          onClick={() => handleClickTopic(topic)}
        />
      ))}

      <button
        className={clsx(styles['next-button'], { [styles['next-button--visible']]: selectedTopics.length > 0 })}
        onClick={handleNext}
      >
        다음
      </button>
    </>
  );
}
