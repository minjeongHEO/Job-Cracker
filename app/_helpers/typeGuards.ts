import { GenerateQuestionResponse } from '@/app/_types/api/interview';
import {
  BADGE_SHADE_TYPES,
  BadgeShadeType,
  DEVELOPER_TYPES,
  DeveloperType,
  UnknownObject,
} from '@/app/_types/interview';
import { isString, isStringArray } from '@/app/_utils/typeUtils';

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

export function isImportanceLevel(value: unknown): value is BadgeShadeType {
  return isString(value) && BADGE_SHADE_TYPES.some((level) => level === value);
}

export function isGenerateQuestionResponse(obj: unknown): obj is GenerateQuestionResponse {
  if (!obj || typeof obj !== 'object') return false;

  const response = obj as UnknownObject;

  return isString(response.question) && isImportanceLevel(response.importance) && isStringArray(response.keywords);
}
