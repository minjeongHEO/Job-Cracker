import { DeveloperType, SelectorVariant } from '@/app/_types/interview';
import { DEVELOPER_OPTIONS } from '@/app/interview/_constants/developers';

export const getTopicParam = (isAllSelected: boolean, selectedTopics: string[]): string =>
  isAllSelected ? 'all' : selectedTopics.join(',');

export const getValidTopics = (devType: DeveloperType) => Object.keys(DEVELOPER_OPTIONS[devType].topics);

export const getValidSubTopics = (devType: DeveloperType, topic: string) =>
  DEVELOPER_OPTIONS[devType].topics[topic] || [];

export const getSelectedTopics = (devType: DeveloperType, param: string) => {
  const validTopics = getValidTopics(devType);

  if (param === 'all') return validTopics;

  return param.split(',');
};

export const getParamsForChat = (
  devType: DeveloperType,
  isAllSelected: boolean,
  selectedTopics: string[],
  searchParams: URLSearchParams
) => {
  const subTopicParam = getTopicParam(isAllSelected, selectedTopics);
  const topicsParam =
    searchParams.get('topics') === 'all' ? getValidTopics(devType).join(',') : searchParams.get('topics');
  const params = new URLSearchParams({
    devType,
    topics: topicsParam || '',
    subTopics: subTopicParam,
  });

  return params;
};

const getParamsForSubTopic = (isAllSelected: boolean, selectedTopics: string[]) => {
  const topicsParam = getTopicParam(isAllSelected, selectedTopics);
  const params = new URLSearchParams({
    topics: topicsParam,
  });

  return params;
};

export const handleNavigation = (
  variant: SelectorVariant,
  devType: DeveloperType,
  selectedTopics: string[],
  isAllSelected: boolean,
  searchParams: URLSearchParams
) => {
  if (!selectedTopics.length) return;

  switch (variant) {
    case 'topic':
      return `/interview/select/${devType}/prepare?${getParamsForSubTopic(isAllSelected, selectedTopics)}`;

    case 'subTopic':
      return `/interview/chat?${getParamsForChat(devType, isAllSelected, selectedTopics, searchParams)}`;
  }
};
