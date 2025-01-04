'use client';

import clsx from 'clsx';

import { GenerateQuestionResponse } from '@/app/_types/api/interview';

import QuestionCard from '../molecules/QuestionCard';
import styles from './QuestionSection.module.scss';

interface QuestionSectionProps {
  onClick: (question: string) => void;
  clickedQuestion: string | null;
  questions: GenerateQuestionResponse[];
}

export default function QuestionSection({ onClick, clickedQuestion, questions }: QuestionSectionProps) {
  return (
    <div className={clsx(styles['question_section'], { [styles['question_section--with-answer']]: clickedQuestion })}>
      <header className={styles['question_section__header']}>질문에 답해주세요</header>
      <section className={styles['question_section__cards']}>
        {questions.map((question, index) => (
          <QuestionCard
            key={`${question.question}-${index}`}
            titleTopic={question.titleTopic}
            question={question.question}
            isSelected={question.question === clickedQuestion}
            onClick={onClick}
            level={question.importance}
          />
        ))}
      </section>
    </div>
  );
}
