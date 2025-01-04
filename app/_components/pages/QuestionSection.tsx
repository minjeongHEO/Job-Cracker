'use client';

import clsx from 'clsx';

import QuestionCard from '@/app/_components/molecules/QuestionCard';

import styles from './QuestionSection.module.scss';

const mock_questions = [
  'React의 장점은 무엇인가요?',
  'Next.js의 장점은 무엇인가요?',
  'TypeScript의 장점은 무엇인가요?',
  'JavaScript 장점은 무엇인가요?',
  'useEffect의 사용법은 무엇인가요?',
  '브라우저 렌더링 과정을 설명해주세요.',
] as string[];

interface QuestionSectionProps {
  onClick: (question: string) => void;
  clickedQuestion: string | null;
}

export default function QuestionSection({ onClick, clickedQuestion }: QuestionSectionProps) {
  return (
    <div className={clsx(styles['question_section'], { [styles['question_section--with-answer']]: clickedQuestion })}>
      <header className={styles['question_section__header']}>질문에 답해주세요</header>
      <section className={styles['question_section__cards']}>
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
        <QuestionCard
          question={mock_questions[3]}
          isSelected={mock_questions[3] === clickedQuestion}
          onClick={onClick}
          level={'04'}
        />
        <QuestionCard
          question={mock_questions[4]}
          isSelected={mock_questions[4] === clickedQuestion}
          onClick={onClick}
          level={'05'}
        />
        <QuestionCard
          question={mock_questions[5]}
          isSelected={mock_questions[5] === clickedQuestion}
          onClick={onClick}
          level={'01'}
        />
      </section>
    </div>
  );
}
