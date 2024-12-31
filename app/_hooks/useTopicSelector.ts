import { useState } from 'react';

import { TopicSelectorProps } from '../_components/TopicSelector';

export default function useTopicSelector({ topics }: Omit<TopicSelectorProps, 'devType'>) {
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

  const handleSelectAll = () => {
    setSelectedTopics((prevSelectedTopics) => {
      if (prevSelectedTopics.length === topics.length) return [];
      return topics;
    });
  };

  const isSelectedTopic = (topic: string) => selectedTopics.includes(topic);

  return {
    selectedTopics,
    isAllSelected,
    handleClickTopic,
    handleSelectAll,
    isSelectedTopic,
  };
}
