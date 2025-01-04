'use client';

import clsx from 'clsx';

import QuestionCard from '@/app/_components/molecules/QuestionCard';

import styles from './QuestionSection.module.scss';

const mock_questions = [
  'React의 장점은 무엇인가요?',
  'Next.js의 장점은 무엇인가요?',
  'TypeScript의 장점은 무엇인가요?',
] as string[];

interface QuestionSectionProps {
  onClick: (question: string) => void;
  clickedQuestion: string | null;
}

export default function QuestionSection({ onClick, clickedQuestion }: QuestionSectionProps) {
  return (
    <div className={clsx(styles['question_section'], { [styles['question_section--with-answer']]: clickedQuestion })}>
      <header>질문 섹션</header>
      <QuestionCard
        question={mock_questions[0]}
        isSelected={mock_questions[0] === clickedQuestion}
        onClick={onClick}
        level={'01'}
      />
      <QuestionCard
        question={mock_questions[1]}
        isSelected={mock_questions[1] === clickedQuestion}
        onClick={onClick}
        level={'02'}
      />
      <QuestionCard
        question={mock_questions[2]}
        isSelected={mock_questions[2] === clickedQuestion}
        onClick={onClick}
        level={'03'}
      />
    </div>
  );
}
