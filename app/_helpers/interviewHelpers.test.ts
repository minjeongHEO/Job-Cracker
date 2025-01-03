import { describe, expect, it } from 'vitest';

import { getTopicParam, handleNavigation } from './interviewHelpers';

describe('interviewHelpers', () => {
  const TEST_CASES = {
    topic: {
      individual: {
        input: {
          variant: 'topic' as const,
          devType: 'FrontEnd' as const,
          selectedTopics: ['React'],
          isAllSelected: false,
          searchParams: new URLSearchParams(),
        },
        expected: '/interview/select/FrontEnd/prepare?topics=React',
      },
      all: {
        input: {
          variant: 'topic' as const,
          devType: 'FrontEnd' as const,
          selectedTopics: ['React', 'JavaScript'],
          isAllSelected: true,
          searchParams: new URLSearchParams(),
        },
        expected: '/interview/select/FrontEnd/prepare?topics=all',
      },
    },
  };

  describe('handleNavigation (핵심)', () => {
    it('topic 타입 - 개별 선택', () => {
      const { input, expected } = TEST_CASES.topic.individual;
      const result = handleNavigation(
        input.variant,
        input.devType,
        input.selectedTopics,
        input.isAllSelected,
        input.searchParams
      );
      expect(result).toBe(expected);
    });

    it('topic 타입 - 전체 선택', () => {
      const { input, expected } = TEST_CASES.topic.all;
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

  describe('getTopicParam (중요)', () => {
    it('전체 선택시 "all" 반환', () => {
      expect(getTopicParam(true, ['React'])).toBe('all');
    });

    it('개별 선택시 콤마로 구분된 문자열 반환', () => {
      expect(getTopicParam(false, ['React', 'JavaScript'])).toBe('React,JavaScript');
    });
  });
});
