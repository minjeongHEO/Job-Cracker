import { FC, SVGProps } from 'react';

export type LoadingType = 'question' | 'feedback' | null;
export interface UnknownObject {
  question?: unknown;
  importance?: unknown;
  keywords?: unknown;
  score?: unknown;
  feedBack?: unknown;
  improvedAnswer?: unknown;
  titleTopic?: unknown;
}
export interface QuestionState {
  id: string;
  question: string;
  importance: BadgeShadeType;
  keywords: string[];
  titleTopic: string;
  userAnswer?: string;
  score?: number;
  feedBack?: string;
  improvedAnswer?: string;
}
export interface InterviewChatProps {
  devType: DeveloperType;
  topics: string[];
  subTopics: string[];
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
