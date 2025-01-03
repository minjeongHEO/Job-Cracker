import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import '@testing-library/jest-dom';
import SelectButton from './SelectButton';
import styles from './SelectButton.module.scss';

// 연관된 테스트들을 그룹화
// 보통 컴포넌트 이름으로 최상위 그룹을 만듦
describe('SelectButton', () => {
  // 개별 테스트 정의
  it('simple 타입 제목이 올바르게 렌더링된다', () => {
    render(<SelectButton variant="simple" option={{ title: 'simple 타입 테스트 제목' }} />);
    expect(screen.getByText('simple 타입 테스트 제목')).toBeInTheDocument();
  });

  it('detail 타입에서는 설명과 토픽이 렌더링된다', () => {
    render(
      <SelectButton
        variant="detailed"
        option={{
          title: '프론트엔드',
          description: '웹 프론트엔드 개발자',
          topics: { React: [], TypeScript: [], JavaScript: [] },
        }}
      />
    );

    expect(screen.getByText('프론트엔드')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('선택된 상태에서는 wrapper--selected 클래스가 추가된다', () => {
    const { getByRole } = render(<SelectButton variant="simple" option={{ title: '테스트 제목' }} isSelected={true} />);

    // NOTE: CSS Modules는 클래스 이름에 고유한 해시를 추가하기 때문에 실제 클래스 이름이 다르므로 styles 객체 사용(CSS Modules의 실제 클래스 이름을 사용)
    // expect(getByRole('button')).toHaveClass('wrapper--selected'); x
    expect(getByRole('button')).toHaveClass(styles['wrapper--selected']);
  });

  it('클릭했을 때 onClick 핸들러가 호출되어야 한다', () => {
    // 1. mock 함수 생성
    const handleClick = vi.fn();
    // vi.fn()은 Vitest에서 제공하는 mock 함수 생성기
    // 이 함수는 호출 여부, 호출 횟수 등을 추적할 수 있음

    render(
      <SelectButton
        variant="simple"
        option={{ title: '자바스크립트' }}
        onClick={handleClick} // mock 함수를 props로 전달
      />
    );

    // 3. 클릭 이벤트 발생
    fireEvent.click(screen.getByText('자바스크립트'));
    // - screen.getByText(): '자바스크립트' 텍스트를 가진 요소를 찾음
    // - fireEvent.click(): 해당 요소에 클릭 이벤트를 발생시킴

    // 4. 테스트 검증
    expect(handleClick).toHaveBeenCalledTimes(1);
    // - handleClick이 정확히 1번 호출되었는지 확인
    // - 0번이면 클릭이 동작하지 않은 것
    // - 2번 이상이면 중복 호출된 것
  });
});
