import { FC, SVGProps } from 'react';

export interface UnknownObject {
  question?: unknown;
  importance?: unknown;
  keywords?: unknown;
}
export interface QuestionState {
  id: string;
  question: string;
  importance: BadgeShadeType;
  keywords: string[];
  titleTopic: string;
  userAnswer?: string;
  score?: number;
  feedback?: string;
  improvedAnswer?: string;
}

export const DEVELOPER_TYPES = ['FrontEnd', 'BackEnd', 'iOS'] as const;
export type DeveloperType = (typeof DEVELOPER_TYPES)[number];

export type OptionDetails = {
  Icon: FC<SVGProps<SVGSVGElement>>; // SVG 컴포넌트 타입
  title: string;
  description: string;
  topics: { [key: string]: string[] };
};

export type DeveloperOptionType = {
  [K in DeveloperType]: OptionDetails;
};

export type SelectorVariant = 'topic' | 'subTopic';

export const BADGE_SHADE_TYPES = ['01', '02', '03', '04', '05'] as const;
export type BadgeShadeType = (typeof BADGE_SHADE_TYPES)[number];
