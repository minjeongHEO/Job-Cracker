// 'use client';

import clsx from 'clsx';

import Badge from './Badge';
import CardStyles from './QuestionCard.module.scss';

type ShadeType = '01' | '02' | '03' | '04' | '05';

interface QuestionCardProps {
  // question: string;
  isSelected?: boolean;
  onClick?: () => void;
  level?: ShadeType;
}

const IMPORTANCE_LEVEL: Record<ShadeType, { title: string; shade: ShadeType }> = {
  '01': { title: '최우선 🚨', shade: '01' },
  '02': { title: '필수 ⭐️⭐️⭐️', shade: '02' },
  '03': { title: '중요 ⭐️⭐️', shade: '03' },
  '04': { title: '기본 ⭐️', shade: '03' },
  '05': { title: '심화', shade: '05' },
};

export default function QuestionCard({ isSelected = false, onClick, level = '05' }: QuestionCardProps) {
  const { title, shade } = IMPORTANCE_LEVEL[level];

  return (
    <div className={wrapperClass(isSelected)} onClick={onClick} aria-label={'질문'}>
      <header className={CardStyles['question-card__header']}>
        <span className={CardStyles['question-card__topic']}>주제</span>
        <Badge option={{ title, shade }}></Badge>
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
