// 'use client';

import clsx from 'clsx';

import Badge from '@/app/_components/atoms/Badge';
import { BadgeShadeType } from '@/app/_types/interview';

import CardStyles from './QuestionCard.module.scss';

interface QuestionCardProps {
  // question: string;
  isSelected?: boolean;
  onClick: (question: string) => void;
  level?: BadgeShadeType;
  question: string;
  titleTopic: string;
}

export const IMPORTANCE_LEVEL: Record<BadgeShadeType, { title: string; shade: BadgeShadeType }> = {
  '01': { title: '최우선 🚨', shade: '01' },
  '02': { title: '필수 ⭐️⭐️⭐️', shade: '02' },
  '03': { title: '중요 ⭐️⭐️', shade: '03' },
  '04': { title: '기본 ⭐️', shade: '04' },
  '05': { title: '심화', shade: '05' },
};

export default function QuestionCard({
  isSelected = false,
  onClick = () => {},
  level = '05',
  question,
  titleTopic,
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
        <span className={CardStyles['question-card__score']}>점수</span>
        <button className={CardStyles['question-card__button--view']} onClick={() => onClick(question)}>
          답변 보기
        </button>
        <button className={CardStyles['question-card__button--new']}>다른 주제</button>
      </footer>
    </div>
  );
}

function wrapperClass(selected: boolean) {
  return clsx(CardStyles['question-card'], {
    [CardStyles['question-card--selected']]: selected,
  });
}
