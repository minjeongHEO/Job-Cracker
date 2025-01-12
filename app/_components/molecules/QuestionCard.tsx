'use client';

import clsx from 'clsx';

import Badge from '@/app/_components/atoms/Badge';
import { QuestionState } from '@/app/_types/interview';
import { IMPORTANCE_LEVEL } from '@/app/interview/_constants/questions';

import styles from './QuestionCard.module.scss';

interface QuestionCardProps {
  isSelected?: boolean;
  handleQuestionClick: (question: string) => void;
  question: QuestionState;
  isLastQuestion: boolean;
  handleGenerateAnotherQuestion: () => void;
}

export default function QuestionCard({
  isSelected = false,
  handleQuestionClick,
  question: { score = 0, userAnswer = '', id, question, titleTopic, importance: level = '05' },
  isLastQuestion,
  handleGenerateAnotherQuestion,
}: QuestionCardProps) {
  const { title, shade } = IMPORTANCE_LEVEL[level];

  return (
    <div className={wrapperClass(isSelected)} aria-label={'질문'}>
      <header className={styles['question-card__header']}>
        <span className={styles['question-card__topic']}>{titleTopic}</span>
        <Badge option={{ title, shade }}></Badge>
      </header>

      <section className={styles['question-card__question']}>
        <p className={styles['question-card__question-content']}>Q. {question}</p>
      </section>

      <footer className={styles['question-card__answer']}>
        {userAnswer && (
          <>
            <span className={styles['question-card__score']}>{score} 점</span>
            <button className={styles['question-card__button--view']} onClick={() => handleQuestionClick(id)}>
              답변 보기
            </button>
          </>
        )}

        {isLastQuestion && (
          <button className={styles['question-card__button--new']} onClick={handleGenerateAnotherQuestion}>
            다른 주제
          </button>
        )}
      </footer>
    </div>
  );
}

function wrapperClass(selected: boolean) {
  return clsx(styles['question-card'], {
    [styles['question-card--selected']]: selected,
  });
}
