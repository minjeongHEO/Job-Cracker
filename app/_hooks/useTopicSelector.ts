import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { TopicSelectorProps } from '../_components/TopicSelector';

export default function useTopicSelector({ variant = 'topic', devType, topics }: TopicSelectorProps) {
  const router = useRouter();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const isAllSelected = selectedTopics.length === topics.length;

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

  return {
    selectedTopics,
    isAllSelected,
    handleClickTopic,
    selectAll,
    isSelectedTopic,
    navigateToNext,
  };
}
