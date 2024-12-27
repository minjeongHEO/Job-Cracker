'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { DeveloperType } from '@/app/_types/interview';

import SelectButton from './SelectButton';

interface TopicSelectorProps {
  devType: DeveloperType;
  topics: string[];
}

export default function TopicSelector({ devType, topics }: TopicSelectorProps) {
  const router = useRouter();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const handleNext = () => {
    if (!selectedTopics.length) return;
    const topicParam = selectedTopics.length === topics.length ? `all` : selectedTopics.join(',');
    router.push(`/interview/developer/${devType}/prepare?topics=${topicParam}`);
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

      <button onClick={handleNext} disabled={selectedTopics.length === 0}>
        다음
      </button>
    </>
  );
}
