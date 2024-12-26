import { FC, SVGProps } from 'react';

export type DeveloperType = 'FrontEnd' | 'BackEnd' | 'iOS';

export type OptionDetails = {
  Icon: FC<SVGProps<SVGSVGElement>>; // SVG 컴포넌트 타입
  title: string;
  description: string;
  topics: { [key: string]: string[] };
};

export type DeveloperOptionType = {
  [K in DeveloperType]: OptionDetails;
};
