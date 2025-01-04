'use client';

import clsx from 'clsx';

import QuestionCard from '@/app/_components/molecules/QuestionCard';
import { QuestionState } from '@/app/_types/interview';

import styles from './QuestionSection.module.scss';

interface QuestionSectionProps {
  onClick: (question: string) => void;
  selectedQuestionId: string | null;
  questions: QuestionState[];
}

export default function QuestionSection({ onClick, selectedQuestionId, questions }: QuestionSectionProps) {
  return (
    <div
      className={clsx(styles['question_section'], { [styles['question_section--with-answer']]: selectedQuestionId })}
    >
      <header className={styles['question_section__header']}>
        <p className="title">면접관의 질문에 도전해보세요</p>
        <p className={styles['sub-title']}>꼬리 질문으로 실력 레벨업! 팔로♾️로미 😉</p>
      </header>
      <section className={styles['question_section__cards']}>
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            titleTopic={question.titleTopic}
            question={question}
            isSelected={question.id === selectedQuestionId}
            onClick={onClick}
            level={question.importance}
          />
        ))}
      </section>
    </div>
  );
}
