import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import buttonStyles from '@/app/_components/atoms/SelectButton.module.scss';
import { DeveloperType } from '@/app/_types/interview';

import TopicSelector from './TopicSelector';

export const ROUTES = {
  SUBTOPIC: '/interview/chat',
  TOPIC: {
    build: (devType: string, topics: string) => `/interview/select/${devType}/prepare?topics=${topics}`,
  },
} as const;

// NOTE: useRouter를 사용하는 컴포넌트를 테스트할 때는 Next.js의 App Router context를 mock 해줘야 합니다.
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
}));

const defaultProps = {
  devType: 'FrontEnd' as DeveloperType,
  topics: ['JavaScript', 'React', 'TypeScript'],
};
const [firstTopicName] = defaultProps.topics;
const allTopicsButtonText = '전체 선택';
const nextButtonText = '다음';
const topicCount = defaultProps.topics.length;

describe('TopicSelector', () => {
  beforeEach(() => {
    // NOTE: 각 테스트 전에 mock 초기화
    mockPush.mockClear();
  });

  describe('-렌더링 관련', () => {
    it('제목과 주제 선택 카운터가 렌더링 된다.', () => {
      render(<TopicSelector {...defaultProps} />);

      expect(screen.getByText('원하는 주제를 선택해주세요.')).toBeInTheDocument();
      expect(screen.getByText(`0/${topicCount}`)).toBeInTheDocument();
    });

    it('전체 선택 버튼과 모든 주제 선택 버튼이 렌더링 된다.', () => {
      render(<TopicSelector {...defaultProps} />);

      expect(screen.getByText(allTopicsButtonText)).toBeInTheDocument();
      defaultProps.topics.forEach((topic) => {
        expect(screen.getByText(topic)).toBeInTheDocument();
      });
    });
  });

  describe('-다음 버튼 관련', () => {
    it('선택된 주제가 없을 때는 다음 버튼이 disabled 속성을 가진다.', () => {
      render(<TopicSelector {...defaultProps} />);

      // 다음 버튼 확인
      const nextButton = screen.getByRole('button', { name: nextButtonText });

      expect(nextButton).toHaveAttribute('disabled');
    });

    it('주제가 선택되면 다음 버튼이 disabled 속성을 가지지 않는다.', () => {
      render(<TopicSelector {...defaultProps} />);

      // 주제 선택
      const topicButton = screen.getByRole('button', { name: firstTopicName });
      fireEvent.click(topicButton);

      // 다음 버튼 확인
      const nextButton = screen.getByRole('button', { name: nextButtonText });

      expect(nextButton).not.toHaveAttribute('disabled');
    });
  });

  describe('-주제 선택 관련', () => {
    it('주제 선택 시 카운터가 업데이트 된다.', () => {
      render(<TopicSelector {...defaultProps} />);

      // 주제 선택
      const topicButton = screen.getByRole('button', { name: firstTopicName });
      fireEvent.click(topicButton);

      expect(screen.getByText(`1/${topicCount}`)).toBeInTheDocument();
    });

    it('전체 선택 버튼을 누르면 모든 주제가 선택된다.', () => {
      render(<TopicSelector {...defaultProps} />);

      // 전체 선택
      const topicAllButton = screen.getByRole('button', { name: allTopicsButtonText });
      fireEvent.click(topicAllButton);

      // 카운터 확인
      expect(screen.getByText(`${defaultProps.topics.length}/${defaultProps.topics.length}`)).toBeInTheDocument();

      // 모든 토픽 버튼이 선택 상태인지 확인
      defaultProps.topics.forEach((topic) => {
        const topicButton = screen.getByRole('button', { name: topic });
        expect(topicButton).toHaveClass(buttonStyles['wrapper--selected']);
      });
    });

    it('전체 선택 후 개별 버튼을 해제하면 전체 선택 버튼이 해제된다.', () => {
      render(<TopicSelector {...defaultProps} />);

      // 전체 선택
      const topicAllButton = screen.getByRole('button', { name: allTopicsButtonText });
      fireEvent.click(topicAllButton);

      // 개별 선택 해제
      const topicButton = screen.getByRole('button', { name: firstTopicName });
      fireEvent.click(topicButton);

      // 전체 선택 버튼 해제 확인
      expect(topicAllButton).not.toHaveClass(buttonStyles['wrapper--selected']);

      // 카운터 업데이트 확인
      expect(screen.getByText(`${defaultProps.topics.length - 1}/${defaultProps.topics.length}`)).toBeInTheDocument();
    });
  });
});
