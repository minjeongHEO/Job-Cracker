// 'use client';

import clsx from 'clsx';

import Badge from './Badge';
import CardStyles from './QuestionCard.module.scss';

interface QuestionCardProps {
  // question: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function QuestionCard({ isSelected = false, onClick }: QuestionCardProps) {
  return (
    <div className={wrapperClass(isSelected)} onClick={onClick} aria-label={'질문'}>
      <header className={CardStyles['question-card__header']}>
        <span className={CardStyles['question-card__topic']}>주제</span>
        <Badge option={{ title: '중요도' }}></Badge>
      </header>

      <section className={CardStyles['question-card__question']}>
        <p className={CardStyles['question-card__question-content']}>Q. React의 장점은 무엇인가요?</p>
      </section>

      <footer className={CardStyles['question-card__answer']}>
        <span className={CardStyles['question-card__score']}>점수</span>
        <button className={CardStyles['question-card__button--view']}>답변 보기</button>
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
