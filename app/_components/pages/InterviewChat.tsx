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
  const { loadingType, handleGenerateFirstQuestion, handelGenerateAnotherQuestion, handleGenerateFeedbackAnswer } =
    useQuestionActions({
      questions,
      addQuestion,
      changeLastQuestion,
      updateFollowUpQuestion,
    });

  useEffect(() => {
    const generateInitialQuestion = async () => {
      if (loadingType !== null) return;
      if (questions.length > 0) return;
      handleGenerateFirstQuestion({ devType, topics, subTopics });
    };

    generateInitialQuestion();
  }, [devType, topics, subTopics]);

  return (
    <div className={styles['interview-chat']}>
      <div
        className={clsx(styles['interview-chat__container'], {
          [styles['interview-chat__container--with-answer']]: selectedQuestionId,
        })}
      >
        <QuestionSection
          loadingType={loadingType}
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
      />
    </div>
  );
}
