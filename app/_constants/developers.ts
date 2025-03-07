import BackEndIcon from '@/app/_assets/svg/backend.svg';
import FrontEndIcon from '@/app/_assets/svg/frontend.svg';
import iOSIcon from '@/app/_assets/svg/ios.svg';
import { DeveloperOptionType } from '@/app/_types/interview';

export const DEVELOPER_OPTIONS: DeveloperOptionType = {
  FrontEnd: {
    Icon: FrontEndIcon,
    title: 'FrontEnd Developer',
    description: 'UI/UX에 관심이 많고, 사용자 경험을 개선하는 것을 즐기시나요?',
    topics: {
      'HTML/CSS': [
        '시맨틱 태그와 웹 접근성',
        'CSS Box Model과 Layout',
        'Flexbox와 Grid 시스템',
        'CSS 애니메이션과 트랜지션',
        'CSS 방법론(BEM, OOCSS)',
        '반응형 웹 디자인과 미디어 쿼리',
      ],
      JavaScript: [
        '스코프와 클로저',
        '실행 컨텍스트와 this',
        '프로토타입과 상속',
        '이벤트 루프와 비동기 처리',
        'ES6+ 주요 기능',
        'Promise와 async/await',
        '브라우저 렌더링 과정',
      ],
      TypeScript: ['타입 시스템 기초', '인터페이스와 타입 별칭', '제네릭', '유틸리티 타입', '타입 가드와 타입 좁히기'],
      React: [
        '가상 DOM과 렌더링 최적화',
        '컴포넌트 생명주기',
        'Hooks 동작 원리와 사용법',
        '상태 관리 전략',
        'React 성능 최적화',
        'SSR과 CSR',
      ],
      'Next.js': [
        'Next.js 라우팅 시스템',
        'SSR, SSG, ISR 렌더링 전략',
        'App Router vs Pages Router',
        'Next.js 캐싱 전략',
        'API Routes와 미들웨어',
      ],
    },
  },
  BackEnd: {
    Icon: BackEndIcon,
    title: 'BackEnd Developer',
    description: '서버 로직과 데이터 처리에 더 흥미를 느끼시나요?',
    topics: {
      Java: [
        'OOP 원칙과 디자인 패턴',
        'Collection Framework',
        'Stream API',
        '멀티스레딩과 동시성',
        'JVM 동작 원리와 가비지 컬렉션',
        '자바 메모리 구조',
      ],
      Spring: [
        'IoC와 DI 원리',
        'AOP 개념과 활용',
        'Spring MVC 구조',
        'Spring Security',
        'JPA와 Hibernate',
        'Transaction 관리',
      ],
      Database: [
        'ACID 속성',
        '정규화와 반정규화',
        '인덱스 설계와 최적화',
        'Transaction Isolation Level',
        'SQL 성능 최적화',
      ],
      Architecture: [
        'RESTful API 설계',
        '마이크로서비스 아키텍처',
        '도메인 주도 설계(DDD)',
        '캐싱 전략',
        '로드밸런싱과 스케일링',
      ],
    },
  },
  iOS: {
    Icon: iOSIcon,
    title: 'iOS Developer',
    description: '모바일 앱 개발과 애플 생태계에 관심이 있으신가요?',
    topics: {
      Swift: [
        'Swift 기본 문법',
        '옵셔널과 옵셔널 체이닝',
        'ARC와 메모리 관리',
        'Protocol과 Extensions',
        'Generics',
        'Concurrency와 GCD',
      ],
      'UIKit/SwiftUI': [
        'View Controller 생명주기',
        'Auto Layout',
        'TableView/CollectionView',
        'Core Data',
        'SwiftUI 상태 관리',
        'UIKit과 SwiftUI 통합',
      ],
      'iOS Development': [
        'App 생명주기',
        'Push Notification',
        'Local/Remote Data 처리',
        '앱 보안과 인증',
        'App Store 배포 프로세스',
      ],
      'iOS Architecture': [
        'MVC, MVVM, Clean Architecture',
        'Dependency Injection',
        '단위 테스트와 UI 테스트',
        '성능 최적화',
        '앱 아키텍처 패턴',
      ],
    },
  },
};
