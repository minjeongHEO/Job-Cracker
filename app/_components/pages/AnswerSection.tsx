'use client';
import clsx from 'clsx';

import ArrowRightIcon from '@/app/_components/atoms/ArrowRightIcon';
import Badge from '@/app/_components/atoms/Badge';
import { BadgeShadeType } from '@/app/_types/interview';

import styles from './AnswerSection.module.scss';

interface AnswerSectionProps {
  onClick: (question: string | null) => void;
  clickedQuestion: string | null;
  level: { title: string; shade: BadgeShadeType };
  keywords: string[];
  score: number;
  answer: string;
  feedback: string;
  improvedAnswer: string;
}

export default function AnswerSection({
  onClick,
  clickedQuestion,
  level: { title: levelTitle, shade: levelShade },
  keywords,
  score,
  answer,
  feedback,
  improvedAnswer,
}: AnswerSectionProps) {
  return (
    <div className={clsx(styles['answer-section'], { [styles['answer-section--visible']]: clickedQuestion })}>
      <button className={styles['close-button']} aria-label={'답변 닫기'} onClick={() => onClick(null)}>
        <ArrowRightIcon className={styles['close-button__icon']} />
      </button>
      <header className={styles['answer-section__header']}>
        <span className={styles['question']}>Q. {clickedQuestion}</span>
        <Badge option={{ title: levelTitle, shade: levelShade }}></Badge>
      </header>

      <section className={styles['answer-section__answer']}>
        <div className={styles['answer-contents']}>
          <div className={styles['answer-contents__title']}>학습 키워드</div>

          <div className={styles['answer-contents__answer-keyword']}>
            {keywords.map((keyword) => (
              <Badge key={keyword} option={{ title: keyword }}></Badge>
            ))}
          </div>
        </div>

        <div className={styles['answer-contents']}>
          <div className={styles['answer-contents__title']}>평가 점수</div>
          <p className={styles['answer-contents__answer']}>{score} 점</p>
        </div>

        <div className={styles['answer-contents']}>
          <div className={styles['answer-contents__title']}>당신의 답변</div>
          <p className={styles['answer-contents__answer-me']}>{answer}</p>
        </div>

        <div className={styles['answer-contents']}>
          <div className={styles['answer-contents__title']}>피드백 내용</div>
          <p className={styles['answer-contents__answer']}>{feedback}</p>
        </div>

        <div className={styles['answer-contents']}>
          <div className={styles['answer-contents__title']}>개선된 답변</div>
          <p className={styles['answer-contents__answer']}>{improvedAnswer}</p>
        </div>
      </section>
    </div>
  );
}
