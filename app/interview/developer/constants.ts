import backEndIcon from '@/public/icons/backend.svg';
import frontEndIcon from '@/public/icons/frontend.svg';
import IOSIcon from '@/public/icons/ios.svg';

export const DEVELOPER_OPTIONS = {
  frontEnd: {
    icon: frontEndIcon,
    title: 'FrontEnd Developer',
    description: 'UI/UX에 관심이 많고, 사용자 경험을 개선하는 것을 즐기시나요?',
    techSkills: ['JavaScript', 'TypeScript', 'HTML/CSS', 'React', 'Next.js'],
  },
  backEnd: {
    icon: backEndIcon,
    title: 'backEnd Developer',
    description: '서버 로직과 데이터 처리에 더 흥미를 느끼시나요?',
    techSkills: ['Java', 'Spring Boot', 'MySQL', 'AWS'],
  },
  IOS: {
    icon: IOSIcon,
    title: 'IOS Developer',
    description: '모바일 앱 개발과 애플 생태계에 관심이 있으신가요?',
    techSkills: ['Swift', 'SwiftUI', 'UIKit', 'Xcode'],
  },
};
