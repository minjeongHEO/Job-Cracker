import BackEndIcon from '@/app/_assets/svg/backend.svg';
import FrontEndIcon from '@/app/_assets/svg/frontend.svg';
import iOSIcon from '@/app/_assets/svg/ios.svg';
import { DeveloperOptionType } from '@/app/_types/interview';

export const DEVELOPER_OPTIONS: DeveloperOptionType = {
  FrontEnd: {
    Icon: FrontEndIcon,
    title: 'FrontEnd Developer',
    description: 'UI/UX에 관심이 많고, 사용자 경험을 개선하는 것을 즐기시나요?',
    subTitles: ['JavaScript', 'TypeScript', 'HTML/CSS', 'React', 'Next.js'],
  },
  BackEnd: {
    Icon: BackEndIcon,
    title: 'backEnd Developer',
    description: '서버 로직과 데이터 처리에 더 흥미를 느끼시나요?',
    subTitles: ['Java', 'Spring Boot', 'MySQL', 'AWS'],
  },
  iOS: {
    Icon: iOSIcon,
    title: 'iOS Developer',
    description: '모바일 앱 개발과 애플 생태계에 관심이 있으신가요?',
    subTitles: ['Swift', 'SwiftUI', 'UIKit', 'Xcode'],
  },
};
