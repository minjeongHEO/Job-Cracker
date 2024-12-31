import { useState } from 'react';

import { TopicSelectorProps } from '../_components/TopicSelector';

export default function useTopicSelector({ topics }: Omit<TopicSelectorProps, 'devType'>) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const selector = {
    isAllSelected: selectedTopics.length === topics.length,
    isTopicSelected: (topic: string) => selectedTopics.includes(topic),
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

  const handleSelectAll = () => {
    setSelectedTopics((prevSelectedTopics) => {
      if (prevSelectedTopics.length === topics.length) return [];
      return topics;
    });
  };

  return {
    selectedTopics,
    isAllSelected: selector.isAllSelected,
    isTopicSelected: selector.isTopicSelected,
    handleClickTopic,
    handleSelectAll,
  };
}
