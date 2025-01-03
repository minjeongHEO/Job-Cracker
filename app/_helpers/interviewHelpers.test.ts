import { describe, expect, it, vi } from 'vitest';

import {
  getSelectedTopics,
  getTopicParam,
  getVaildSubTopics,
  getVaildTopics,
  handleNavigation,
} from './interviewHelpers';

// DEVELOPER_OPTIONS Mock
vi.mock('@/app/interview/_constants/developers', () => ({
  DEVELOPER_OPTIONS: {
    FrontEnd: {
      topics: {
        JavaScript: ['스코프', '클로저'],
        React: ['훅스', '상태관리'],
        TypeScript: ['타입추론', '제네릭'],
      },
    },
  },
}));

describe('interviewHelpers', () => {
  const TEST_CASES = [
    {
      name: 'topic 타입 - 개별 선택',
      input: {
        variant: 'topic' as const,
        devType: 'FrontEnd' as const,
        selectedTopics: ['React'],
        isAllSelected: false,
        searchParams: new URLSearchParams(),
      },
      expected: '/interview/select/FrontEnd/prepare?topics=React',
    },
    {
      name: 'topic 타입 - 전체 선택',
      input: {
        variant: 'topic' as const,
        devType: 'FrontEnd' as const,
        selectedTopics: ['React', 'JavaScript'],
        isAllSelected: true,
        searchParams: new URLSearchParams(),
      },
      expected: '/interview/select/FrontEnd/prepare?topics=all',
    },
    {
      name: 'subTopic 타입 - URL에 모든 필수 파라미터 포함',
      input: {
        variant: 'subTopic' as const,
        devType: 'FrontEnd' as const,
        selectedTopics: ['JavaScript'],
        isAllSelected: false,
        searchParams: new URLSearchParams({
          topics: 'JavaScript',
        }),
      },
      expected: '/interview/chat?devType=FrontEnd&topics=JavaScript&subTopics=JavaScript',
    },
  ];

  describe('handleNavigation (핵심)', () => {
    TEST_CASES.forEach(({ name, input, expected }) => {
      it(name, () => {
        const result = handleNavigation(
          input.variant,
          input.devType,
          input.selectedTopics,
          input.isAllSelected,
          input.searchParams
        );
        expect(result).toBe(expected);
      });
    });
  });

  describe('getTopicParam (중요)', () => {
    it('전체 선택시 "all" 반환', () => {
      expect(getTopicParam(true, ['React'])).toBe('all');
    });

    it('개별 선택시 콤마로 구분된 문자열 반환', () => {
      expect(getTopicParam(false, ['React', 'JavaScript'])).toBe('React,JavaScript');
    });

    it('선택된 토픽이 없을 때 빈 문자열 반환', () => {
      expect(getTopicParam(false, [])).toBe('');
    });
  });

  describe('getVaildTopics', () => {
    it('devType에 해당하는 모든 토픽을 반환한다', () => {
      const result = getVaildTopics('FrontEnd');
      expect(result).toEqual(['JavaScript', 'React', 'TypeScript']);
    });
  });

  describe('getVaildSubTopics', () => {
    it('특정 토픽의 모든 서브토픽을 반환한다', () => {
      const result = getVaildSubTopics('FrontEnd', 'JavaScript');
      expect(result).toEqual(['스코프', '클로저']);
    });

    it('존재하지 않는 토픽의 경우 빈 배열을 반환한다', () => {
      const result = getVaildSubTopics('FrontEnd', 'nonexistent');
      expect(result).toEqual([]);
    });
  });

  describe('getSelectedTopics', () => {
    it('param이 "all"인 경우 모든 유효한 토픽을 반환한다', () => {
      const result = getSelectedTopics('FrontEnd', 'all');
      expect(result).toEqual(['JavaScript', 'React', 'TypeScript']);
    });

    it('콤마로 구분된 토픽 문자열을 배열로 반환한다', () => {
      const result = getSelectedTopics('FrontEnd', 'JavaScript,React');
      expect(result).toEqual(['JavaScript', 'React']);
    });

    it('빈 문자열인 경우 빈 배열을 반환한다', () => {
      const result = getSelectedTopics('FrontEnd', '');
      expect(result).toEqual(['']);
    });
  });
});
