'use client';

import clsx from 'clsx';

import Input from '@/app/_components/molecules/Input';
import QuestionCard from '@/app/_components/molecules/QuestionCard';
import { LoadingType, QuestionState } from '@/app/_types/interview';

import SpinnerIcon from '@/app/_components/icons/SpinnerIcon';
import styles from './QuestionSection.module.scss';

interface QuestionSectionProps {
  loadingType: LoadingType;
  handleQuestionClick: (question: string) => void;
  selectedQuestionId?: string;
  questions: QuestionState[];
  handleGenerateAnotherQuestion: () => void;
  handleGenerateFeedbackAnswer: (answer: string) => void;
}

export default function QuestionSection({
  loadingType,
  handleQuestionClick,
  selectedQuestionId,
  questions,
  handleGenerateAnotherQuestion,
  handleGenerateFeedbackAnswer,
}: QuestionSectionProps) {
  return (
    <div className={transitionWidthClass(selectedQuestionId)}>
      <header className={styles['question_section__header']}>
        <p className="title">면접 질문에 답변해보세요</p>
        <p className={styles['sub-title']}>꼬리 질문으로 실력 레벨업! 팔로♾️로미 😉</p>
      </header>
      <SpinnerIcon className={loadingClass(loadingType)} width={80} height={80} />
      <section className={styles['question_section__cards']}>
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            isSelected={question.id === selectedQuestionId}
            handleQuestionClick={handleQuestionClick}
            isLastQuestion={index === questions.length - 1}
            handleGenerateAnotherQuestion={handleGenerateAnotherQuestion}
            loadingType={loadingType}
          />
        ))}
      </section>
      <div className={styles['question_section__input-container']}>
        <Input handleGenerateFeedbackAnswer={handleGenerateFeedbackAnswer} loadingType={loadingType} />
      </div>
    </div>
  );
}

function loadingClass(loadingType: LoadingType) {
  return clsx(styles['loading-spinner'], {
    [styles['loading-spinner--loading-animation']]: loadingType !== null,
  });
}
function transitionWidthClass(selectedQuestionId: string | undefined) {
  return clsx(styles['question_section'], {
    [styles['question_section--with-answer']]: selectedQuestionId,
  });
}
