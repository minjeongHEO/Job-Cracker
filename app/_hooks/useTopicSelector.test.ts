import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import '@testing-library/jest-dom';

import useTopicSelector from './useTopicSelector';

const defaultProps = {
  topics: ['JavaScript', 'React', 'TypeScript'],
};

describe('useTopicSelector', () => {
  // toggleTopic + handleClickTopic
  it('미선택 주제를 클릭하면 해당 주제를 추가한다.', () => {
    const { result } = renderHook(() => useTopicSelector(defaultProps));

    act(() => {
      result.current.handleClickTopic('JavaScript');
    });

    expect(result.current.selectedTopics).toContain('JavaScript');
    expect(result.current.selectedTopics).toHaveLength(1);
  });

  it('이미 선택된 주제를 클릭하면 해당 주제를 제거한다.', () => {
    const { result } = renderHook(() => useTopicSelector(defaultProps));

    act(() => {
      result.current.handleClickTopic('JavaScript');
      result.current.handleClickTopic('JavaScript');
    });

    expect(result.current.selectedTopics).not.toContain('JavaScript');
    expect(result.current.selectedTopics).toHaveLength(0);
  });

  // handleSelectAll +  isAllSelected
  it('전체 선택을 누르면 전체가 선택된다.', () => {
    const { result } = renderHook(() => useTopicSelector(defaultProps));

    act(() => {
      result.current.handleSelectAll();
    });

    expect(result.current.selectedTopics).toEqual(defaultProps.topics);
    expect(result.current.isAllSelected).toBe(true);
  });

  it('이미 전체 선택이 된 상태에서 전체 선택을 누르면 전체가 해제된다.', () => {
    const { result } = renderHook(() => useTopicSelector(defaultProps));

    act(() => {
      result.current.handleSelectAll(); // 전체 선택
      result.current.handleSelectAll(); // 전체 해제
    });

    expect(result.current.selectedTopics).toHaveLength(0);
    expect(result.current.isAllSelected).toBe(false);
  });

  it('선택된 주제가 있을 때, 이미 선택된 주제인지 확인한다.', () => {
    const { result } = renderHook(() => useTopicSelector(defaultProps));

    act(() => {
      result.current.handleClickTopic('JavaScript');
    });

    expect(result.current.isTopicSelected('JavaScript')).toBe(true);
    expect(result.current.isTopicSelected('React')).toBe(false);
  });
});
