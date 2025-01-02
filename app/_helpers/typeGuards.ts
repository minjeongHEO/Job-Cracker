import { DEVELOPER_TYPES, DeveloperType } from '@/app/_types/interview';

import { getSelectedTopics, getVaildSubTopics, getVaildTopics } from './interviewHelpers';

export const isDeveloperType = (value: string): value is DeveloperType => {
  if (!value) return false;
  return DEVELOPER_TYPES.some((type) => type === value);
};

export const isValidSubTopicParam = (devType: DeveloperType, topic: string, subTopicParam: string) => {
  if (!devType || !topic || !subTopicParam) return false;
  if (subTopicParam === 'all') return true;

  const vaildTopics = getSelectedTopics(devType, topic);
  const validSubTopics = vaildTopics.flatMap((topic) => getVaildSubTopics(devType, topic));

  return subTopicParam.split(',').every((subTopic) => validSubTopics.includes(subTopic));
};

export const isValidTopicParam = (devType: DeveloperType, topicParam: string) => {
  if (!devType || !topicParam) return false;
  if (topicParam === 'all') return true;

  const validTopics = getVaildTopics(devType);

  return topicParam.split(',').every((topic) => validTopics.includes(topic));
};
