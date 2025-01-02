import { DeveloperType } from '@/app/_types/interview';
import { DEVELOPER_OPTIONS } from '@/app/interview/_constants/developers';

export const getTopicParam = (isAllSelected: boolean, selectedTopics: string[]): string =>
  isAllSelected ? 'all' : selectedTopics.join(',');

export const getVaildTopics = (devType: DeveloperType) => Object.keys(DEVELOPER_OPTIONS[devType].topics);

export const isValidTopicParam = (devType: DeveloperType, param: string) => {
  const validTopics = getVaildTopics(devType);

  if (param === 'all') return true;

  return param.split(',').every((topic) => validTopics.includes(topic));
};

export const getSelectedTopics = (devType: DeveloperType, param: string) => {
  const validTopics = getVaildTopics(devType);

  if (param === 'all') return validTopics;

  return param.split(',');
};
