'use client';

import clsx from 'clsx';

import Badge from '@/app/_components/atoms/Badge';
import { BadgeShadeType, QuestionState } from '@/app/_types/interview';
import { IMPORTANCE_LEVEL } from '@/app/interview/_constants/questions';

import CardStyles from './QuestionCard.module.scss';

interface QuestionCardProps {
  isSelected?: boolean;
  handleQuestionClick: (question: string) => void;
  level?: BadgeShadeType;
  question: QuestionState;
  titleTopic: string;
  isLastQuestion: boolean;
  handleGenerateAnotherQuestion: () => void;
}

export default function QuestionCard({
  isSelected = false,
  handleQuestionClick,
  level = '05',
  question: { score, userAnswer, id, question },
  titleTopic,
  isLastQuestion,
  handleGenerateAnotherQuestion,
}: QuestionCardProps) {
  const { title, shade } = IMPORTANCE_LEVEL[level];

  return (
    <div className={wrapperClass(isSelected)} aria-label={'질문'}>
      <header className={CardStyles['question-card__header']}>
        <span className={CardStyles['question-card__topic']}>{titleTopic}</span>
        <Badge option={{ title, shade }}></Badge>
      </header>

      <section className={CardStyles['question-card__question']}>
        <p className={CardStyles['question-card__question-content']}>Q. {question}</p>
      </section>

      <footer className={CardStyles['question-card__answer']}>
        {score && <span className={CardStyles['question-card__score']}>{score}점</span>}
        {userAnswer && (
          <button className={CardStyles['question-card__button--view']} onClick={() => handleQuestionClick(id)}>
            답변 보기
          </button>
        )}
        {isLastQuestion && (
          <button className={CardStyles['question-card__button--new']} onClick={handleGenerateAnotherQuestion}>
            다른 주제
          </button>
        )}
      </footer>
    </div>
  );
}

function wrapperClass(selected: boolean) {
  return clsx(CardStyles['question-card'], {
    [CardStyles['question-card--selected']]: selected,
  });
}
