import { v4 as uuidv4 } from 'uuid';

import { DeveloperType, LoadingType, QuestionState } from '@/app/_types/interview';

import { generateAnotherQuestionAPI, generateFeedbackAnswerAPI, generateQuestionAPI } from '@/services/api/interview';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { AddQuestionType, ChangeLastQuestionType, UpdateFollowUpQuestionType } from './useQuestionState';

interface PropUseQuestionActions {
  questions: QuestionState[];
  addQuestion: AddQuestionType;
  changeLastQuestion: ChangeLastQuestionType;
  updateFollowUpQuestion: UpdateFollowUpQuestionType;
}
interface QuestionGenerateParams {
  devType: DeveloperType;
  topics: string[];
  subTopics: string[];
}
interface FeedbackGenerateParams {
  topics: string[];
  userAnswer: string;
}

export default function useQuestionActions({
  questions,
  addQuestion,
  changeLastQuestion,
  updateFollowUpQuestion,
}: PropUseQuestionActions) {
  const [loadingType, setLoadingType] = useState<LoadingType>(null);

  /** 처음 질문 생성 */
  const handleGenerateFirstQuestion = async (params: QuestionGenerateParams) => {
    setLoadingType('question');
    try {
      const question = await generateQuestionAPI(params);
      const anotherQuestion = { ...question, id: uuidv4() };

      addQuestion(anotherQuestion);
    } catch (error) {
      toast(error instanceof Error ? error.message : '질문 생성 중 오류가 발생했습니다.');
      console.error(error instanceof Error ? error.message : '질문 생성 중 오류가 발생했습니다.');
    } finally {
      setLoadingType(null);
    }
  };

  /** 다른 주제로 질문 변경 */
  const handelGenerateAnotherQuestion = async (params: QuestionGenerateParams) => {
    if (!questions.length) return;
    setLoadingType('question');
    try {
      const question = await generateAnotherQuestionAPI({
        ...params,
        questionState: questions[questions.length - 1],
      });
      const anotherQuestion = { ...question, id: uuidv4() };

      changeLastQuestion(anotherQuestion);
    } catch (error) {
      toast(error instanceof Error ? error.message : '주제 변경 중 오류가 발생했습니다.');
      console.error(error instanceof Error ? error.message : '주제 변경 중 오류가 발생했습니다.');
    } finally {
      setLoadingType(null);
    }
  };

  /** 질문 피드백 생성 */
  const handleGenerateFeedbackAnswer = async (params: FeedbackGenerateParams) => {
    if (!questions.length) return;
    setLoadingType('feedback');
    try {
      const { question: lastQuestion } = questions[questions.length - 1];
      const feedBackData = await generateFeedbackAnswerAPI({
        ...params,
        question: lastQuestion,
      });

      updateFollowUpQuestion({ ...feedBackData, userAnswer: params.userAnswer });
    } catch (error) {
      toast(error instanceof Error ? error.message : '피드백 생성 중 오류가 발생했습니다.');
      console.error(error instanceof Error ? error.message : '피드백 생성 중 오류가 발생했습니다.');
    } finally {
      setLoadingType(null);
    }
  };

  return { loadingType, handleGenerateFirstQuestion, handelGenerateAnotherQuestion, handleGenerateFeedbackAnswer };
}
