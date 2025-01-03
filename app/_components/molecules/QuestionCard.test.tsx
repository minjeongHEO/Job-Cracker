import { cleanup, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import '@testing-library/jest-dom';
import QuestionCard, { IMPORTANCE_LEVEL } from './QuestionCard';

describe('QuestionCard', () => {
  it('중요도 레벨에 따라 올바른 Badge가 렌더링된다', () => {
    render(<QuestionCard level="01" />);
    expect(screen.getByText(IMPORTANCE_LEVEL['01'].title)).toBeInTheDocument();

    cleanup();
    render(<QuestionCard level="02" />);
    expect(screen.getByText(IMPORTANCE_LEVEL['02'].title)).toBeInTheDocument();

    cleanup();
    render(<QuestionCard level="03" />);
    expect(screen.getByText(IMPORTANCE_LEVEL['03'].title)).toBeInTheDocument();

    cleanup();
    render(<QuestionCard level="04" />);
    expect(screen.getByText(IMPORTANCE_LEVEL['04'].title)).toBeInTheDocument();

    cleanup();
    render(<QuestionCard level="05" />);
    expect(screen.getByText(IMPORTANCE_LEVEL['05'].title)).toBeInTheDocument();
  });
});
