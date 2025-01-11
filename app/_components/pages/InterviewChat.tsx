'use client';

import clsx from 'clsx';

import useQuestions from '@/app/_hooks/useQuestions';
import { InterviewChatProps } from '@/app/_types/interview';
import { IMPORTANCE_LEVEL } from '@/app/interview/_constants/questions';

import AnswerSection from './AnswerSection';
import styles from './InterviewChat.module.scss';
import QuestionSection from './QuestionSection';

export default function InterviewChat({ devType, topics, subTopics }: InterviewChatProps) {
  const {
    handleGenerateAnotherQuestion,
    handleGenerateFeedbackAnswer,
    selectedQuestion,
    handleQuestionClick,
    handleCloseAnswer,
    selectedQuestionId,
    questions,
  } = useQuestions({ devType, topics, subTopics });

  return (
    <div className={styles['interview-chat']}>
      <div
        className={clsx(styles['interview-chat__container'], {
          [styles['interview-chat__container--with-answer']]: selectedQuestionId,
        })}
      >
        <QuestionSection
          handleQuestionClick={handleQuestionClick}
          selectedQuestionId={selectedQuestionId}
          questions={questions}
          handleGenerateAnotherQuestion={handleGenerateAnotherQuestion}
          handleGenerateFeedbackAnswer={handleGenerateFeedbackAnswer}
        />
      </div>

      <AnswerSection
        handleCloseAnswer={handleCloseAnswer}
        selectedQuestion={selectedQuestion}
        level={IMPORTANCE_LEVEL[selectedQuestion?.importance || '05']}
        keywords={selectedQuestion?.keywords || []}
        score={selectedQuestion?.score || 0}
        userAnswer={selectedQuestion?.userAnswer || ''}
        feedBack={selectedQuestion?.feedBack || ''}
        improvedAnswer={selectedQuestion?.improvedAnswer || ''}
      />
    </div>
  );
}
