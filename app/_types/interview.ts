import { FC, SVGProps } from 'react';

export type DeveloperType = 'FrontEnd' | 'BackEnd' | 'iOS';

export type TopicDetails = string[];

export type TechTopics = {
  [key: string]: TopicDetails;
};

export type TopicsType = {
  [K in DeveloperType]: TechTopics;
};

export type OptionDetails = {
  Icon: FC<SVGProps<SVGSVGElement>>; // SVG 컴포넌트 타입
  title: string;
  description: string;
  subTitles: string[];
};

export type DeveloperOptionType = {
  [K in DeveloperType]: OptionDetails;
};
