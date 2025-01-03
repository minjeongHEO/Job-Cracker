import { describe, expect, it } from 'vitest';

import { getTopicParam, handleNavigation } from './interviewHelpers';

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
  });
});
