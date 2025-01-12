'use client';
import clsx from 'clsx';

import Badge from '@/app/_components/atoms/Badge';
import { BadgeShadeType, QuestionState } from '@/app/_types/interview';

import AnswerContent from '@/app/_components/atoms/AnswerContent';
import ArrowRightIcon from '@/app/_components/icons/ArrowRightIcon';
import styles from './AnswerSection.module.scss';

interface AnswerSectionProps {
  handleCloseAnswer: () => void;
  selectedQuestion?: QuestionState;
  level: { title: string; shade: BadgeShadeType };
}

export default function AnswerSection({
  handleCloseAnswer,
  level: { title: levelTitle, shade: levelShade },
  selectedQuestion = {
    id: '',
    question: '',
    importance: '05',
    keywords: [],
    titleTopic: '',
  },
}: AnswerSectionProps) {
  const { keywords, score, userAnswer, feedBack, improvedAnswer } = selectedQuestion;

  return (
    <div
      className={clsx(styles['answer-section'], { [styles['answer-section--visible']]: selectedQuestion.id !== '' })}
    >
      <button className={styles['close-button']} aria-label={'답변 닫기'} onClick={handleCloseAnswer}>
        <ArrowRightIcon className={styles['close-button__icon']} />
      </button>
      <header className={styles['answer-section__header']}>
        <span className={styles['question']}>Q. {selectedQuestion?.question}</span>
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

        <AnswerContent type="default" title="평가 점수">
          {score} 점
        </AnswerContent>
        <AnswerContent type="answer" title="당신의 답변">
          {userAnswer}
        </AnswerContent>
        <AnswerContent type="default" title="피드백 내용">
          {feedBack}
        </AnswerContent>
        <AnswerContent type="default" title="개선된 답변">
          {improvedAnswer}
        </AnswerContent>
      </section>
    </div>
  );
}
