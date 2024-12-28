import { DEVELOPER_TYPES, DeveloperType } from '@/app/_types/interview';

export const isDeveloperType = (value: string): value is DeveloperType => {
  return DEVELOPER_TYPES.some((type) => type === value);
};
