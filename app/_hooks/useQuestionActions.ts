import { v4 as uuidv4 } from 'uuid';

import { DeveloperType, QuestionState } from '@/app/_types/interview';

import { generateAnotherQuestionAPI, generateFeedbackAnswerAPI, generateQuestionAPI } from '@/services/api/interview';

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
    const question = await generateQuestionAPI({
      devType,
      topics,
      subTopics,
    });
    const anotherQuestion = { ...question, id: uuidv4() };

    addQuestion(anotherQuestion);
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
    const question = await generateAnotherQuestionAPI({
      devType,
      topics,
      subTopics,
      questionState: questions[questions.length - 1],
    });
    const anotherQuestion = { ...question, id: uuidv4() };

    changeLastQuestion(anotherQuestion);
  };

  /** 질문 피드백 생성 */
  const handleGenerateFeedbackAnswer = async ({ topics, answerText }: { topics: string[]; answerText: string }) => {
    if (!questions.length) return;
    const { question: lastQuestion } = questions[questions.length - 1];
    const feedBackData = await generateFeedbackAnswerAPI({
      topics,
      question: lastQuestion,
      userAnswer: answerText,
    });

    updateFollowUpQuestion({ ...feedBackData, answerText });
  };

  return { handleGenerateFirstQuestion, handelGenerateAnotherQuestion, handleGenerateFeedbackAnswer };
}
