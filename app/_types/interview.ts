import { FC, SVGProps } from 'react';

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
