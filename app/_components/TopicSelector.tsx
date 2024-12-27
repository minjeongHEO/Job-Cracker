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
    router.push(`/interview/developer/${devType}/prepare?topics=${selectedTopics.join(',')}`);
  };

  const handleClickTopic = (clickedTopic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(clickedTopic) ? prev.filter((topic) => topic !== clickedTopic) : [...prev, clickedTopic]
    );
  };

  return (
    <>
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
