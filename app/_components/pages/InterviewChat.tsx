'use client';

import clsx from 'clsx';
import { useEffect } from 'react';

import useQuestionActions from '@/app/_hooks/useQuestionActions';
import useQuestionSelection from '@/app/_hooks/useQuestionSelection';
import useQuestionState from '@/app/_hooks/useQuestionState';
import { InterviewChatProps } from '@/app/_types/interview';
import { IMPORTANCE_LEVEL } from '@/app/interview/_constants/questions';

import AnswerSection from './AnswerSection';
import styles from './InterviewChat.module.scss';
import QuestionSection from './QuestionSection';

export default function InterviewChat({ devType, topics, subTopics }: InterviewChatProps) {
  // 상태 관리 커스텀 훅
  const { addQuestion, questions, changeLastQuestion, updateFollowUpQuestion } = useQuestionState();
  // 선택 로직 커스텀 훅
  const { selectedQuestionId, selectedQuestion, handleQuestionClick, handleCloseAnswer } =
    useQuestionSelection(questions);
  // 액션 커스텀 훅
  const { handleGenerateFirstQuestion, handelGenerateAnotherQuestion, handleGenerateFeedbackAnswer } =
    useQuestionActions({
      questions,
      addQuestion,
      changeLastQuestion,
      updateFollowUpQuestion,
    });

  useEffect(() => {
    const generateInitialQuestion = async () => {
      if (questions.length > 0) return;
      handleGenerateFirstQuestion({ devType, topics, subTopics });
    };

    generateInitialQuestion();
  }, [devType, topics, subTopics, questions.length]);

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
          handleGenerateAnotherQuestion={() => handelGenerateAnotherQuestion({ devType, topics, subTopics })}
          handleGenerateFeedbackAnswer={(answerText) => handleGenerateFeedbackAnswer({ topics, answerText })}
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
