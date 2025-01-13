import { v4 as uuidv4 } from 'uuid';

import { DeveloperType, LoadingType, QuestionState } from '@/app/_types/interview';

import { generateAnotherQuestionAPI, generateFeedbackAnswerAPI, generateQuestionAPI } from '@/services/api/interview';

import { useState } from 'react';
import { AddQuestionType, ChangeLastQuestionType, UpdateFollowUpQuestionType } from './useQuestionState';

interface PropUseQuestionActions {
  questions: QuestionState[];
  addQuestion: AddQuestionType;
  changeLastQuestion: ChangeLastQuestionType;
  updateFollowUpQuestion: UpdateFollowUpQuestionType;
}

export default function useQuestionActions({
  questions,
  addQuestion,
  changeLastQuestion,
  updateFollowUpQuestion,
}: PropUseQuestionActions) {
  const [loadingType, setLoadingType] = useState<LoadingType>(null);

  /** 처음 질문 생성 */
  const handleGenerateFirstQuestion = async ({
    devType,
    topics,
    subTopics,
  }: {
    devType: DeveloperType;
    topics: string[];
    subTopics: string[];
  }) => {
    setLoadingType('question');
    try {
      const question = await generateQuestionAPI({
        devType,
        topics,
        subTopics,
      });
      const anotherQuestion = { ...question, id: uuidv4() };

      addQuestion(anotherQuestion);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '오류가 발생했습니다.');
    } finally {
      setLoadingType(null);
    }
  };

  /** 다른 주제로 질문 변경 */
  const handelGenerateAnotherQuestion = async ({
    devType,
    topics,
    subTopics,
  }: {
    devType: DeveloperType;
    topics: string[];
    subTopics: string[];
  }) => {
    if (!questions.length) return;
    setLoadingType('question');
    try {
      const question = await generateAnotherQuestionAPI({
        devType,
        topics,
        subTopics,
        questionState: questions[questions.length - 1],
      });
      const anotherQuestion = { ...question, id: uuidv4() };

      changeLastQuestion(anotherQuestion);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '오류가 발생했습니다.');
    } finally {
      setLoadingType(null);
    }
  };

  /** 질문 피드백 생성 */
  const handleGenerateFeedbackAnswer = async ({ topics, answerText }: { topics: string[]; answerText: string }) => {
    if (!questions.length) return;
    setLoadingType('feedback');
    try {
      const { question: lastQuestion } = questions[questions.length - 1];
      const feedBackData = await generateFeedbackAnswerAPI({
        topics,
        question: lastQuestion,
        userAnswer: answerText,
      });

      updateFollowUpQuestion({ ...feedBackData, answerText });
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '오류가 발생했습니다.');
    } finally {
      setLoadingType(null);
    }
  };

  return { loadingType, handleGenerateFirstQuestion, handelGenerateAnotherQuestion, handleGenerateFeedbackAnswer };
}
